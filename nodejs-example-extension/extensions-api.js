const { basename } = require('path');
const httpClient = require('./http_client');

const baseUrl = `http://${process.env.AWS_LAMBDA_RUNTIME_API}/2020-01-01/extension`;

async function register() {
    console.info('[extensions-api:register] Registering using baseUrl', baseUrl);
    const res = await httpClient.fetch(`${baseUrl}/register`, {
        method: 'POST',
        body: JSON.stringify({
            'events': [
                'INVOKE',
                'SHUTDOWN'
            ],
        }),
        headers: {
            'Content-Type': 'application/json',
            'Lambda-Extension-Name': basename(__dirname),
        }
    });

    if (!res.ok) {
        console.error('register failed', await res.text());
    }

    return res.headers.get('lambda-extension-identifier');
}

async function next(extensionId) {
    console.info('[extensions-api:next] Waiting for next event');
    // const res = await fetch(`${baseUrl}/event/next`, {
    const res = await httpClient.fetch(`${baseUrl}/event/next`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Lambda-Extension-Identifier': extensionId
        }
    });

    if (!res.ok) {
        console.error('[extensions-api:next] Failed receiving next event', await res.text());
        return null;
    }

    // await return res.json();
    return res.json();
}

module.exports = {
    register,
    next,
};
