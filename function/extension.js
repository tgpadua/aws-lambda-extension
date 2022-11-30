const http = require('http');

const EXTENSION_LISTENER = 'http://sandbox.localdomain:5050';

async function send(data) {
    const res = await fetch(EXTENSION_LISTENER, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        console.error('sending data to extension failed', await res.text());
    }
}

module.exports = {
    send
}