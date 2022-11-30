#!/usr/bin/env node
const { register, next } = require('./extensions-api');
const listener = require('./listener');

const EventType = {
    INVOKE: 'INVOKE',
    SHUTDOWN: 'SHUTDOWN',
};

function handleShutdown(event) {
    console.log('[extension-index:handleShutdown] event receveid');
    process.exit(0);
}

function handleInvoke(event) {
    console.log('[extension-index:handleInvoke] event receveid');
}

(async function main() {
    console.log('[extension-index:main] Starting extension');
    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));

    listener.start();

    const extensionId = await register();
    console.log(`[extension-index:main] Registered with extensionId ${extensionId}`);

    // loop function invocations
    while (true) {
        const event = await next(extensionId);
        switch (event.eventType) {
            case EventType.SHUTDOWN:
                handleShutdown(event);
                break;
            case EventType.INVOKE:
                handleInvoke(event);
                break;
            default:
                throw new Error(`[extension-index:main] unknown event: ${event}`);
        }
    }
})();
