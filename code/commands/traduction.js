var config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "traduction",
    description: "Asks you to translate a english word in french.",
    usage: "traduction [--dictionary_name]",
    options: ["--dictionary_name: Name of the dictionary from which you wish to pick the word from [default: random dictionary]."],
    execute(message) {
        config = require("../config.json");

        const args = message.content.toLowerCase().split(/ +/);
        var dictionary_name = args[1];

        if (dictionary_name == undefined) {
            const dictionaries = fs
                .readdirSync("./dictionaries")
                .filter((file) => file.endsWith(".json"));

            let random_dict_id = Math.floor(Math.random() * dictionaries.length);
            dictionary_name = dictionaries[random_dict_id].split(".")[0];
        }

        var dictionary;
        try {
            dictionary = require(`../dictionaries/${dictionary_name}.json`);
        } catch(err) {
            message.reply(`The dictionary \`${dictionary_name}\` you requested don't seem to exist.\nPlease type \`${config.prefix}dict list\` to list existing dictionaries.`);
            return;
        }

        let random_word_id = Math.floor(Math.random() * dictionary.words.length);
        let word = dictionary.words[random_word_id];

        message.reply(`Traduct \`${word.english}\` (${dictionary_name}) in french!`);

        fs.writeFile(
            [".", "temp", message.author.id + ".txt"].join("/"), 
            `${word.french}\r\n${dictionary_name}`, 
            (err) => {
                if (err) console.log(err.message);
            }
        );
    },
};