const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "translation",
    description: "Asks you to translate a french word in english.",
    usage: config.prefix + "translation",
    options: "",
    execute(message) {
        const dictionary = require('../dictionary.json');
        let selected_id = Math.floor(Math.random() * dictionary.words.length);
        let word = dictionary.words[selected_id];

        message.channel.send("Translate `" + word.french + "` in english!");

        fs.writeFile(
            [".", "temp", message.author.id + ".txt"].join("/"), 
            word.english, 
            (err) => {
                if (err) console.log(err.message);
            }
        );
    },
};