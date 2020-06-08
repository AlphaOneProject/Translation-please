const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "help",
    description: "List all available commands.",
    usage: config.prefix + "help",
    options: "",
    execute(message) {
        let str = '';
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (command.options != "") {
                str += `Name:\n\t${command.name}\nDescription:\n\t${command.description}\nUsage:\n\t${command.usage}\nOptions:\n${command.options}\n\n`;
            }
            else {
                str += `Name:\n\t${command.name}\nDescription:\n\t${command.description}\nUsage:\n\t${command.usage}\n\n`;
            }
        }

        message.channel.send(str);
    },
};