const auth = require('./auth.json');
const config = require('./config.json');
const functions = require('./functions.js');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

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
});

client.on("message", (message) => {
	fs.mkdirSync([".", "debug", message.guild.name].join("/"), { recursive: true });
	fs.appendFile(
		[".", "debug", message.guild.name, message.channel.name + ".txt"].join("/"), 
		functions.get_formatted_date() + message.author.tag + "> " + message.content + "\n", 
		(err) => {
			if (err) console.log(err.message);
	});

	if (fs.existsSync("./stats/" + message.author.id + ".txt")) {
		let valid_word = fs.readFileSync("./stats/" + message.author.id + ".txt", 'utf8').toLowerCase();
		if (message.content.toLowerCase() == valid_word) {
			message.reply("Congratulations! You found the right word!");
		}
		else {
			message.reply("You failed... the word was " + valid_word + ".");
		}
		fs.unlinkSync("./stats/" + message.author.id + ".txt");
	}

	if (!message.content.startsWith(config.prefix)) return;
	if (message.author.bot) return;
	
	const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	try {
		command.execute(message);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(auth.token);