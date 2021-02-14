var config = require("../config.json");
const fs = require("fs");

const WORDS_BY_PAGE = 20;

module.exports = {
    name: "dict",
    description: `Displays the reference dictionary, by pages of ${WORDS_BY_PAGE} words each.`,
    usage: "dict [--dictionary_name] [--page_number]",
    options: [
        "--dictionary_name: Name of the dictionary to display, use `list` in order to display available dictionaries [default: `list`].",
        "--page_number: Integer of the desired page [default: `1`]."],
    execute(message) {
        config = require("../config.json");

        const args = message.content.toLowerCase().split(/ +/);

        if (args[1] == undefined || args[1] == "list") {
            const dictionaries = fs
                .readdirSync("./dictionaries")
                .filter((file) => file.endsWith(".json"));

            let dictionaries_list = "**============== [ Dictionaries ] ==============**\n\n";
            for (let dictionary_name of dictionaries) {
                dictionary_name = dictionary_name.split(".")[0];
                dictionaries_list += `\t**-** ${dictionary_name}\n`;
            }
            message.channel.send(dictionaries_list);
            return;
        }
        
        var dictionary;
        try {
            dictionary = require(`../dictionaries/${args[1]}.json`);
        } catch(err) {
            message.reply(`The dictionary \`${args[1]}\` you requested don't seem to exist.\nPlease type \`${config.prefix}dict list\` to list existing dictionaries.`);
            return;
        }

        const page_number = Math.ceil(dictionary.words.length / WORDS_BY_PAGE);

        var page = parseInt(args[2], 10);
        if (isNaN(page)) page = 1;
        if (page < 1) {
            message.channel.send(`The correct syntax is ${config.prefix} dict [page_number], with [page_number] being an integer.`);
            return;
        }
        if (page > page_number) {
            message.channel.send(`The dictionary currently has ${page_number} pages, but you requested the page ${page}.`);
            return;
        }

        var str = `**============== [ ${args[1].toUpperCase()} | Page ${page} / ${page_number} ] ==============**\n\`\n`;
        for (let i = (page - 1) * WORDS_BY_PAGE; i < dictionary.words.length && i < page * WORDS_BY_PAGE; i++) {
            var line = `[${i + 1}]`;
            for (let j = line.length; j < 15; j++) {
                line += " ";
            }
            line += dictionary.words[i].english + "   ";
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