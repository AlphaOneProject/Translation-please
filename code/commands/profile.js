const fs = require("fs");

module.exports = {
    name: "profile",
    description: "Display the choosen user's statistics.",
    usage: "profile [--username]",
    options: ["--username: Name of the user which you want to display the profile (he must be on this server!) [default: yourself]."],
    execute(message) {

        const args = message.content.toLowerCase().split(/ +/);

        var wanted_id;
        if (args[1] == undefined) {
            wanted_id = message.author.id;
        }
        else {
            try {
                if (args[1].startsWith("<@!") && args[1].endsWith(">")) {
                    wanted_id = args[1].slice(3, args[1].length - 1);
                }
                else throw Error;
            } catch(err) {
                message.reply("You must mention the user in order to get his profile.");
                return;
            }
        }

        var user_stats = {};
        if (fs.existsSync(`./stats/${wanted_id}.json`)) {
			user_stats = require(`../stats/${wanted_id}.json`);
        }
        else {
            message.reply("The user you requested don't seem to exist, or don't have any training history.");
            return;
        }

        var username = message.author.username;
        if (wanted_id != message.author.id) {
            username = message.mentions.users.first().username;
        }

        const dictionaries = fs
                .readdirSync("./dictionaries")
                .filter((file) => file.endsWith(".json"));

        var str = `**============== [ ${username} ] ==============**\n\n`;
            for (let dictionary_name of dictionaries) {
                dictionary_name = dictionary_name.split(".")[0];
                
                if (user_stats[dictionary_name] == undefined) user_stats[dictionary_name] = {"right": 0, "wrong": 0};

                let t_stats = user_stats[dictionary_name];
                let percentage = Math.round((10000 * t_stats.right) / (t_stats.right + t_stats.wrong)) / 100;
                if (isNaN(percentage)) percentage = 0;

                let line = "`[";
                for (let i = 0; i < Math.round(percentage / 5); i++) {
                    line += "|";
                }
                for (let i = 20; i > Math.round(percentage / 5); i--) {
                    line += "-";
                }
                line += "]   ";
                line += `${percentage}%`;
                for (let i = line.length; i < 34; i++) {line += " ";}

                line += `(${t_stats.right} / ${t_stats.right + t_stats.wrong})   `;
                for (let i = line.length; i < 48; i++) {line += " ";}

                line += `${dictionary_name}\`\n`;

                str += line;
            }

            message.channel.send(str);
    },
};