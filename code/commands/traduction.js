const fs = require('fs');

module.exports = {
    name: "traduction",
    description: "Vous demande de traduire un mot anglais en français.",
    execute(message) {
        const dictionary = require('../dictionary.json');
        let selected_id = Math.floor(Math.random() * dictionary.words.length);
        let word = dictionary.words[selected_id];

        message.channel.send("Traduisez " + word.english + " en français !");

        fs.writeFile(
            [".", "stats", message.author.id + ".txt"].join("/"), 
            word.french, 
            (err) => {
                if (err) console.log(err.message);
            }
        );
    },
};