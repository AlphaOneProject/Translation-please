const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "say",
    description: "Repeat the given message.",
    usage: config.prefix + "say [--text]",
    options: "\t--text: Text to repeat.",
    execute(message) {
        var command = message.content.split(/ +/)[0];
        message.channel.send(message.content.slice(command.length));
    },
};