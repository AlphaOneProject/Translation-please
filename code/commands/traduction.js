const fs = require('fs');

module.exports = {
    name: "traduction",
    description: "Asks you to translate a english word in french.",
    usage: "traduction",
    options: "",
    execute(message) {
        const dictionary = require('../dictionary.json');
        let selected_id = Math.floor(Math.random() * dictionary.words.length);
        let word = dictionary.words[selected_id];

        message.channel.send("Traduisez `" + word.english + "` en français !");

        fs.writeFile(
            [".", "temp", message.author.id + ".txt"].join("/"), 
            word.french, 
            (err) => {
                if (err) console.log(err.message);
            }
        );
    },
};