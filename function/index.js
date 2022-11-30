const extension = require('./extension');

exports.handler = async (event) => {
    await extension.send({ message: `[${Date.now()}] hello from function!` });

    return { statusCode : 200 };
};
