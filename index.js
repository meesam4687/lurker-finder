const Discord = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const { REST } = require("@discordjs/rest");

const client = new Discord.Client({
    intents:[
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildPresences
    ]
})

client.commands = new Discord.Collection();
const cmdArray = []

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  cmdArray.push(command.data)
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
rest.put(Discord.Routes.applicationCommands(process.env.CLIENT_ID), { body: cmdArray })
  .then((data) => console.log(`Registered ${data.length} commands.`))
  .catch(console.error);

client.login(process.env.TOKEN)