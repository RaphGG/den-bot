const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
//const Enmap = require("enmap");

const client = new Discord.Client();
client.config = config;

/*
fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err);
  
  files.forEach(file => {
    if (!file.endsWith("js")) return;

    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);

  files.forEach(file => {
    if (!file.endsWith("js")) return;

    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command: ${commandName}`);
    client.commands.set(commandName, props);
  });
});
*/


client.on("ready", () => { console.log("I am ready!"); });

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "den")
  {
    if (args.length == 0 || (args[0] > 93 || args[0] < 1))
    {
      message.channel.send("Please enter a den number within the range of 1-93.");
      message.delete();
      return;
    }

    message.reply(`Den ${args[0]} has the following pokemon: `, {files: [`./dens/den${args[0]}.png`]});
    message.delete();
  }
});

client.login(config.token);