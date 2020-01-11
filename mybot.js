const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();
client.config = config;

let data = fs.readFileSync("./batch/pokemondata.json");
let pokeSON = JSON.parse(data);

var pokemon = pokeSON.pokemon;

data = fs.readFileSync("./batch/availablepokemon.json");
let availablepokemon = JSON.parse(data);

data = fs.readFileSync("./batch/balldata.json");
var balls = JSON.parse(data);

var ingamePkmn = pokemon.filter(x => {
  return availablepokemon.includes(x.Name);
});

const baseStatCalc = (stat, iv, level) => {
  let x = ((2 * stat) + iv ) * level;
  return Math.floor(x) + level + 10;
}

const catchValue = (hp, catchRate, ballMod) => {
  return ((3*hp - 2) * (catchRate * ballMod)) / (3*hp);
}

const catchPercent = (catchValue) => {
  let x = 1048560;
  let y = 16711680;

  let z = Math.sqrt(Math.sqrt(y/catchValue));

  return (x / z);
}

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
    if (args.length == 0)
    {
      message.channel.send("Please enter a Pokémon to catch followed by a ball of your choice.");
      return;
    }

    else if (args.length == 1)
    {
      let pkmn = ingamePkmn.find(x => {return x.Name.toLowerCase() == args[0].toLowerCase()});
      if (pkmn == null)
      {
        message.channel.send("This Pokémon is not available in current dens.");
        return;
      }
      let cv = catchValue(pkmn.HP, pkmn.CatchRate, balls.find(x => x.name == "Poke Ball").modifier);


      message.channel.send(`Percent chance to catch ${pkmn.Name} with a pokeball is ${catchPercent(cv)}%`);
      console.log(pkmn);
    }
  }

  else if (args.length == 2)
  {

  }
});

client.login(config.token);