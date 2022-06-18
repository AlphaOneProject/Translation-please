var config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "prefix",
    description: "Change the prefix used for all commands.",
    usage: "prefix [--new_prefix]",
    options: ["--new_prefix: New prefix to all commands of this bot."],
    execute(message) {
        config = require("../config.json");
        
        try {
            const args = message.content.split(/ +/);

            if (args[1] == undefined) throw Error;

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
            message.reply("A problem occurred while saving the new prefix.");
        }
    },
};