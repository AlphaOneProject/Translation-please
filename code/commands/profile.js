const fs = require("fs");

module.exports = {
    name: "profile",
    description: "Display the user's statistics.",
    usage: "profile",
    options: "",
    execute(message) {
        var user_stats = {};
        if (fs.existsSync(`./stats/${message.author.id}.json`)) {
			user_stats = require(`../stats/${message.author.id}.json`);
        }
        
        const dictionaries = fs
			.readdirSync("./dictionaries")
			.filter((file) => file.endsWith(".json"));

        var str = `**============== [ ${message.author.username} ] ==============**\n\n`;
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

            line += `(${t_stats.right} / ${t_stats.right + t_stats.wrong})   ${dictionary_name}\`\n`;

            str += line;
        }

        message.channel.send(str);
    },
};