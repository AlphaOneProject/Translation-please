var config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "help",
    description: "List all available commands.",
    usage: "help [--command_name]",
    options: ["--command_name: Name of the desired command [default: list of all commands]."],
    execute(message) {
        config = require("../config.json");
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"));
        const args = message.content.toLowerCase().split(/ +/);

        if (args[1] == undefined) {
            let str = "**================= [ HELP ] =================**\n";
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                str += `**${command.name}:**\t${command.description}\n\t\`${config.prefix}${command.usage}\`\n`;
                if (command.options.length > 0) for (const option of command.options) str += `\t${option}\n`;
            }
            message.channel.send(str);
        }
        else {
            if (!args[1] in commandFiles) {
                message.reply(`The command \`${args[1]}\` you requested don't seem to exist.\nPlease type \`${config.prefix}help\` to list existing commands.`);
                return;
            }
            const command = require(`./${args[1]}`);
            let str = `**================= [ ${args[1].toUpperCase()} ] =================**\n`;
            str += `${command.description}\n\`${config.prefix}${command.usage}\`\n`;
            if (command.options.length > 0) for (const option of command.options) str += `${option}\n`;
            message.channel.send(str);
        }
    },
};