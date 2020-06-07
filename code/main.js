const auth = require('./auth.json');
const functions = require('./functions.js');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

console.log(functions.get_formatted_date() + "Starting...");

const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

client.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(functions.get_formatted_date() + "BOT \"Translation please\" is now ready!\n");
});

client.on('message', () => {
	console.log(message.content);
});

client.login(auth.token);