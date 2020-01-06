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
    switch (args[0])
    {
      case "65":
        
      
      default:

    }

  }

  switch (command)
  {
    case "den": 
      message.channel.send("what den?");
      break;
    case "foo": 
      message.channel.send("bar!");
      break;
    case "asl":
      let [age, sex, loc] = args;
      message.reply(`Hello ${message.author.username}! I see you're an ${age}yo, ${sex}, living in ${loc}.`);
      break;
    default: 
  }
});

client.login(config.token);