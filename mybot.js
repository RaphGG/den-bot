const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

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
      return;
    }

    message.reply(`Den ${args[0]} has the following pokemon: `, {files: [`./dens/den${args[0]}.png`]});
  }
});

client.login(config.token);