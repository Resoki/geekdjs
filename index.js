const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const {token} = require('./config.json')

const config = require('./config.json');
require('dotenv').config()
const handler = require("./handlers/index");

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.prefix = config.prefix

module.exports = client;
handler.connectDb();

handler.db.on('error', async(err)=> {
	console.log('DB error:', err);
});

//force db to rest ON
setInterval(async()=> {
	await handler.db.query('SELECT * FROM word', (err, result)=> {
			// console.log(result)
	});
}, 8000);


[ 'slashCommand', 'events'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(token);