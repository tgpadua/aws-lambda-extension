const http = require('http');
const https = require('https');

/**
 * Mimics fetch implementation to circuven current implementation causing 
 * HeadersTimeoutError during invocation of next method from Lambda Extensions API
 * 
 * @param {*} url 
 * @param {*} options 
 * @returns 
 */
async function fetch(url, options) {
    return new Promise(function (resolve, reject) {
        let client = getClient(url);
        var req = client.request(url, options, function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`Unexpected response: ${res.statusCode}`));
            }

            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });

            // resolve on end
            res.on('end', function () {
                try {
                    body = Buffer.concat(body).toString();
                    let headers = new Map(Object.entries(res.headers));
                    resolve(new Response(true, body, headers));
                } catch (err) {
                    resolve(new Response(false, err.message));
                }
            });
        });

        // reject on request error
        req.on('error', function (err) {
            resolve(new Response(false, err));
        });

        // add body to request if declared
        if (options.body) {
            req.write(options.body);
        }
        // IMPORTANT
        req.end();
    });
}

function getClient(url) {
    let protocol = new URL(url).protocol;
    switch(protocol) {
        case 'http:':
            return http;
            break;
        case 'https:':
            return https;
            break;
        default:
            throw new Error(`Unsupported URL protcol ${protocol}`);
    }
}

class Response {
    constructor(ok, body, headers) {
        this.ok = ok;
        this.body = body;
        this.headers = headers;
    }

    ok() {
        return this.ok;
    }

    text() {
        return (this.ok) ? this.body : this.body.message;
    }

    json() {
        try {
            return (this.ok) ? JSON.parse(this.body) : this.body;
        } catch (err) {
            throw new Error('Response body is not a valid JSON');
        }
    }
}

module.exports = {
    fetch
}