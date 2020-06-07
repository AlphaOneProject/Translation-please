const fs = require('fs');

module.exports = {
    name: "translation",
    description: "Asks you to translate a french word in english.",
    execute(message) {
        const dictionary = require('../dictionary.json');
        let selected_id = Math.floor(Math.random() * dictionary.words.length);
        let word = dictionary.words[selected_id];

        message.channel.send("Translate " + word.french + " in english!");

        fs.writeFile(
            [".", "stats", message.author.id + ".txt"].join("/"), 
            selected_id, 
            (err) => {
                if (err) console.log(err.message);
            }
        );
    },
};