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
    if (args[0] > 99 || args[0] < 0)
      message.channel.send("Please enter a den number to list.");
    
    message.reply(`Den ${args[0]} has the following pokemon: `, {files: [`./dens/den${args[0]}.png`]});
  }

  switch (command)
  {
    case "den": 
      message.channel.send("what den?");
      break;
    default: 
  }
});

client.login(config.token);