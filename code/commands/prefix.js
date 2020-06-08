var config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "prefix",
    description: "Change the prefix used for all commands.",
    usage: "prefix [--new_prefix]",
    options: "\t--new_prefix: New prefix to all commands of this bot.",
    execute(message) {
        config = require("../config.json");
        const args = message.content.split(/ +/);

        try {
            config.prefix = args[1];

            fs.writeFileSync(
                './config.json', 
                JSON.stringify(config, null, 4), 
                (err) => {
                    if (err) console.log(err.message);
                }
            );
            message.channel.send(`Prefix updated to \`${args[1]}\`!`);
        }
        catch(err) {
            console.log(err);
            message.channel.reply("A problem occurred while saving the new prefix.");
        }
    },
};