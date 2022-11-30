// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const httpClient = require('./http_client');
const DISPATCH_POST_URI = process.env.DISPATCH_POST_URI;

async function dispatch(data) {
    console.log(`[extension-dispatcher:dispatch] Dispatching data to ${DISPATCH_POST_URI}`);
    const res = await httpClient.fetch(DISPATCH_POST_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    });

    if (!res.ok) {
        console.log(`[extension-dispatcher:dispatch] Dispatch failed ${res.text()}`);
    } else {
        console.log(`[extension-dispatcher:dispatch] Data dispatched successfully`);
    }
}

module.exports = {
    dispatch
}
