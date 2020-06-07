const auth = require('./auth.json');
const functions = require('./functions.js');
const Discord = require('discord.js');
const client = new Discord.Client();

console.log(functions.getDate() + "[Starting...]\n");
client.login(auth.token);

client.once('ready', () => {
	console.log(functions.getDate() + "[BOT Translation please is now ready]\n\n");
});

client.on('message', () => {
	console.log(message.content);
});