// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const express = require('express');
const dispatcher = require('./dispatcher');

const LISTENER_HOST = process.env.AWS_SAM_LOCAL === 'true' ? '0.0.0.0' : 'sandbox.localdomain';
const LISTENER_PORT = 5050;

function start() {
    console.log(`[extension-listener:start] Starting listener`);
    const app = express();
    app.use(express.text());

    app.post('/', onPost);

    app.listen(LISTENER_PORT, LISTENER_HOST, listen);
}

function listen() {
    console.log(`[extension-listener:start] Listening at http://${LISTENER_HOST}:${LISTENER_PORT}`);
}

async function onPost(req,res) {
    console.log('[extension-listener:onPost] Data received');
    await dispatcher.dispatch(req.body);

    res.send('OK');
}

module.exports = {
    start
};