var config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "help",
    description: "List all available commands.",
    usage: "help",
    options: "",
    execute(message) {
        config = require("../config.json");
        
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"));

        let str = "**============== [ HELP ] ==============**\n\n";
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (command.options != "") {
                str += `**Name:**\n\t${command.name}\n**Description:**\n\t${command.description}\n**Usage:**\n\t\`${config.prefix}${command.usage}\`\n**Options:**\n${command.options}\n`;
            }
            else {
                str += `**Name:**\n\t${command.name}\n**Description:**\n\t${command.description}\n**Usage:**\n\t\`${config.prefix}${command.usage}\`\n`;
            }
            str += "\t\t\t**<---------------------------------------------------------------------->**\n"
        }
        message.channel.send(str);
    },
};