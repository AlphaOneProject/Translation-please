const fs = require('fs');

module.exports = {
    name: "addword",
    description: "With two parameters enable the user to add a new word both in english and in french.",
    usage: "addword [--english] [--french]",
    options: "\t--english: English version of the word.\n\t--french: French version of the word.",
    execute(message) {
        const args = message.content.toLowerCase().split(/ +/);

        try {
            var dictionary = require('../dictionary.json');
            dictionary.words.push({english: args[1], french: args[2]});
    
            fs.writeFileSync(
                './dictionary.json', 
                JSON.stringify(dictionary, null, 4), 
                (err) => {
                    if (err) console.log(err.message);
                }
            );
            message.channel.send("Word added!");
        }
        catch(err) {
            console.log(err);
            message.channel.send("A problem occurred while saving your new word :c");
        }
    },
};