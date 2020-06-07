const fs = require('fs');

module.exports = {
    name: "addword",
    description: "With two parameters enable the user to add a new word both in english and in french.\t\tSyntax: %addword [english] [french]",
    execute(message) {
        const args = message.content.split(/ +/);

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