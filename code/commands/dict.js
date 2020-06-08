const config = require('../config.json');
const fs = require('fs');

const WORDS_BY_PAGE = 20;

module.exports = {
    name: "dict",
    description: `Displays the reference dictionary, by pages of ${WORDS_BY_PAGE} words each.`,
    usage: config.prefix + "dict [--page_number]",
    options: "\t--page_number: Integer of the desired page [default: 1].",
    execute(message) {
        const args = message.content.toLowerCase().split(/ +/);
        const dictionary = require('../dictionary.json');
        const page_number = Math.ceil(dictionary.words.length / WORDS_BY_PAGE);

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

        var str = `**============== [ Page ${page} / ${page_number} ] ==============**\n\`\n`;
        for (let i = (page - 1) * WORDS_BY_PAGE; i < dictionary.words.length && i < page * WORDS_BY_PAGE; i++) {
            var line = `[${i + 1}]`;
            for (let j = line.length; j < 15; j++) {
                line += " ";
            }
            line += `${dictionary.words[i].english}`;
            for (let j = line.length; j < 40; j++) {
                line += " ";
            }
            line += `${dictionary.words[i].french}\n`;
            str += line;
        }
        str += "`";
        message.channel.send(str);
    },
};