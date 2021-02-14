const auth = require("./auth.json");
const config = require("./config.json");
const functions = require("./functions.js");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
var spawn = require("child_process").spawn;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const DEBUG = false;
const DELETE_COMMANDS = true;
const START_DATE = Date.now();

console.log(functions.get_formatted_date() + "Starting...");

client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.admin_commands = new Discord.Collection();
const adminCommandFiles = fs
    .readdirSync("./commands/admin")
    .filter((file) => file.endsWith(".js"));
for (const file of adminCommandFiles) {
    const command = require(`./commands/admin/${file}`);
	client.admin_commands.set(command.name, command);
}

client.once("ready", () => {
	console.log(functions.get_formatted_date() + "BOT \"Translation please\" is now ready!\n");

	client.user.setActivity(`Type '%help' :D`);

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
			dictionary["french"] = line.split("\t")[0]; // To set depending on the raw order.
			dictionary["english"] = line.split("\t")[1];
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

client.on("message", async (message) => {
	fs.mkdirSync([".", "debug", message.guild.name].join("/"), { recursive: true });
	fs.appendFile(
		[".", "debug", message.guild.name, message.channel.name + ".txt"].join("/"), 
		functions.get_formatted_date() + message.author.tag + "> " + message.content + "\n", 
		(err) => {
			if (err) console.log(err.message);
	});
	
	if (message.author.bot) return;

	// Response handling.
	if (fs.existsSync(`./temp/${message.author.id}.txt`)) {

		var user_stats = {};
		if (fs.existsSync(`./stats/${message.author.id}.json`)) {
			user_stats = require(`./stats/${message.author.id}.json`);
		}
		const dictionaries = fs
			.readdirSync("./dictionaries")
			.filter((file) => file.endsWith(".json"));

		for (let dictionary_name of dictionaries) {
			dictionary_name = dictionary_name.split(".")[0];
			if (user_stats[dictionary_name] == undefined) user_stats[dictionary_name] = {"right": 0, "wrong": 0};
		}

		let file_contents = fs.readFileSync(`./temp/${message.author.id}.txt`, 'utf8').split("\r\n");
		let valid_words = file_contents[0].toLowerCase();
		let isValid = false;
		for (let valid_word of valid_words.split("/")) {
			if (message.content.toLowerCase() == valid_word) {
				isValid = true;
			}
		}

		if(isValid) {
			message.reply(`Congratulations! You found the right word, \`${valid_words}\` !`);
			user_stats[file_contents[1]].right += 1;
		}
		else {
			message.reply("You failed... the word was `" + valid_words + "`.");
			user_stats[file_contents[1]].wrong += 1;
		}
		
		fs.writeFileSync(
			`./stats/${message.author.id}.json`, 
			JSON.stringify(user_stats, null, 4), 
			(err) => {
				if (err) console.log(err.message);
			}
		);
		fs.unlinkSync("./temp/" + message.author.id + ".txt");
		return;
	}

	if (!message.content.startsWith(config.prefix) && !message.content.startsWith("%help")) return;
	
	const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
	var command = client.commands.get(commandName);
	if (command == undefined && ["386553917296738306", "256482300324347904"].includes(message.author.id.toString())) {
		command = client.admin_commands.get(commandName);
		if (commandName == "reboot") {
			if (DELETE_COMMANDS) message.delete();
			await delay(100);
			command.execute(message);
			return;
		}
	}
	try {
		if (DELETE_COMMANDS) message.delete();
		command.execute(message);
    } catch (error) {
		if (DEBUG) console.log(error);
        message.reply(`There was an error trying to execute that command!\nType \`${config.prefix}help\` to list existing commands.`);
    }

	if (START_DATE + (config.restart_delay * 60 * 1000) < Date.now()) {
		var child = spawn(__dirname + '/start.bat', [], {
			detached: true,
			stdio: [ 'ignore', 'ignore', 'ignore' ]
		});
		child.unref();
		await delay(100);
		process.exit(0);
	}
});

client.login(auth.token);
