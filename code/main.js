const auth = require("./auth.json");
const config = require("./config.json");
const functions = require("./functions.js");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const DEBUG = false;

console.log(functions.get_formatted_date() + "Starting...");

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

client.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log(functions.get_formatted_date() + "BOT \"Translation please\" is now ready!\n");

	client.user.setActivity(`Type '${config.prefix}help' :D`);

	// DICTIONARIES CONVERSION SECTION
	/* 
	const dictionaries = fs
		.readdirSync("./raw_dictionaries")
		.filter((file) => file.endsWith(".txt"));

	for (const file of dictionaries) {
		var data = fs.readFileSync("./raw_dictionaries/" + file, {encoding:"utf8", flag:"r"});
		
		var words = [];
		for (var line of data.split("\r\n")) {
			var dictionary = {};
			line = line.toLowerCase();
			dictionary["english"] = line.split("\t")[0];
			dictionary["french"] = line.split("\t")[1];
			words.push(dictionary);
		}

		dictionary = {};
		dictionary["words"] = words;
		fs.writeFileSync(
			`./dictionaries/${file.split(".")[0]}.json`, 
			JSON.stringify(dictionary, null, 4), 
			(err) => {
				if (err) console.log(err.message);
			}
		);
	}
	/* */
	// DICTIONARIES CONVERSION SECTION
});

client.on("message", (message) => {
	
	fs.mkdirSync([".", "debug", message.guild.name].join("/"), { recursive: true });
	fs.appendFile(
		[".", "debug", message.guild.name, message.channel.name + ".txt"].join("/"), 
		functions.get_formatted_date() + message.author.tag + "> " + message.content + "\n", 
		(err) => {
			if (err) console.log(err.message);
	});
	
	if (message.author.bot) return;

	// Response handling.
	if (fs.existsSync("./temp/" + message.author.id + ".txt")) {

		let valid_words = fs.readFileSync("./temp/" + message.author.id + ".txt", 'utf8').toLowerCase();
		for (let valid_word of valid_words.split("/")) {
			if (message.content.toLowerCase() == valid_word) {
				
				message.reply(`Congratulations! You found the right word, \`${valid_words}\` !`);
				fs.unlinkSync("./temp/" + message.author.id + ".txt");
				return;
			}
		}
		
		message.reply("You failed... the word was `" + valid_words + "`.");
		fs.unlinkSync("./temp/" + message.author.id + ".txt");
		return;
	}

	if (!message.content.startsWith(config.prefix)) return;
	
	const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	try {
		if (commandName == "prefix") {
			command.execute(client, message);
		}
		else {
			command.execute(message);
		}
    } catch (error) {
		if (DEBUG) console.log(error);
        message.reply(`There was an error trying to execute that command!\nType "${config.prefix}help" to list existing commands.`);
    }
});

client.login(auth.token);