if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
//const Enmap = require("enmap");


const output = fs.readFileSync("./batch/Batch Pokemon.txt", "utf8");
const tokens = output.split(/ +/g);
//console.log(tokens);

const pk = tokens.filter((token) => {return !token.match(/^[0-9]+$/)});
console.log(pk);

const testput = fs.readFileSync("./batch/Batch Catch Rate.txt", "utf8");
const testkens = testput.split(/ +/g);
let pokemon = new Array();
pk.forEach(poke => {
  let mon = {
    name:poke
  }
  pokemon.push(mon);
});

pokemon.forEach(mon => {
  console.log(mon.name);
});

/*
testkens.forEach(testken => {

});
*/
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
    if (args.length == 0 || (args[0].valueOf() > 93 || args[0].valueOf() < 1))
    {
      message.channel.send("Please enter a den number within the range of 1-93.");
      //message.delete();
      return;
    }

    message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./dens/den${args[0]}.png`]});
    //message.delete();
  }

  else if (command === "ping")
  {
    let adminRole = message.guild.roles.find(role => role.name == "Admin");
    if (!message.member.roles.has(adminRole.id))
    {
      console.log("Admin?");
      return;
    }

    if (args.length == 0)
    {
      message.channel.send("Please enter a role to ping.");
      return;
    }

    let myRole = message.guild.roles.find(role => role.name == args[0]);
    myRole.setMentionable(true, "Role to be pinged.");
    message.channel.send(`${myRole}`).then(() => {
      myRole.setMentionable(false, "Role has been Pinged.")});
    return;
  }

  else if (command === "catch")
  {
    let calc = require("./modules/calcular.js");
    if (args.length == 0)
    {
      message.channel.send("Please enter a Pokémon to catch followed by a ball of your choice.");
      return;
    }

    else if (args.length == 1)
    {

    }
  }

  else
  {

  }
});

client.login(config.token);