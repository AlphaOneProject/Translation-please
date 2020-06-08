const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "dict",
    description: "Displays the reference dictionary, by pages of 10 words each.",
    usage: config.prefix + "dict [--page_number]",
    options: "\t--page_number: Integer of the desired page [default: 1].",
    execute(message) {
        const args = message.content.toLowerCase().split(/ +/);
        const dictionary = require('../dictionary.json');
        const page_number = Math.ceil(dictionary.words.length / 10);

        var page = parseInt(args[1], 10);
        if (isNaN(page)) page = 1;
        if (page < 1) {
            message.channel.send(`The correct syntax is ${config.prefix} dict [page_number], with [page_number] being an integer.`);
            return;
        }
        if (page > page_number) {
            message.channel.send(`The dictionary currently has ${page_number} pages, but you requested the page ${page}.`);
            return;
        }

        var str = `\t\t\t**[Page ${page} / ${page_number}]**\n`;
        for (let i = (page - 1) * 10; i < dictionary.words.length && i < page * 10; i++) {
            str += `[${i + 1}]\t\t\t${dictionary.words[i].english}\t\t\t${dictionary.words[i].french}\n`;
        }
        message.channel.send(str);
    },
};