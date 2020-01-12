const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();
client.config = config;

/*
let pkmnCatchRate = new Array();
let allPkmn = new Array();

let output = fs.readFileSync("./batch/Batch Pokemon.txt", "utf8");
let tokens = output.split(/ +/g);

const availablePkmn = tokens.filter((token) => {return !token.match(/^[0-9]+$/)});

output = fs.readFileSync("./batch/Batch Catch Rate.txt", "utf8");
tokens = output.split(/ +/g);
tokens.forEach((token, i) => {
  if (i % 3 == 2)
  {
    let poke = {
      id:Number.parseInt(tokens[i-2]),
      name:tokens[i-1],
      catchRate:Number.parseInt(token)
    }
    pkmnCatchRate.push(poke);
  }
});

let pokemon = pkmnCatchRate.filter((mon) => {return availablePkmn.includes(mon.name)});

//console.log(pokemon);

const calculator = (pkmn, ball) => {

  
  let ballList = new Array();
  let balls = {
    name:"",
    catchRate:""
  }

  return ballList;
}

output = fs.readFileSync("./batch/totalbin.json");
allPkmn = JSON.parse(output);
//console.log(allPkmn.pokemon);

//console.log(pkmnCatchRate);

allPkmn.pokemon.forEach(mon => {
  mon.CatchRate = pkmnCatchRate.find(x => mon.ID == x.id).catchRate;
});

let newData = JSON.stringify(allPkmn);
fs.writeFileSync("./batch/pokemondata.json", newData);
let p = allPkmn.pokemon.filter(mon => {return availablePkmn.includes(mon.Name)});

//console.log(p);
*/

/*
const Enmap = require("enmap");
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

/*
console.log(`Everything:\nBall: ${ball.name}\nmodCatchRate0: ${modCatchRate0}\nmodCatchRate31: ${modCatchRate31}\nshakeProb0: ${shakeProb0}\nshakeProb31: ${shakeProb31}\n`);

let ballModifier = balls.find(x => x.name == "Poke Ball").modifier;
console.log(`Ball Modifier for Pokeball is: ${ballModifier}`);

let maxhp0 = baseStatCalc(pkmn.HP, 0, 30);
console.log(`Max HP at iv 0, level 30 is: ${maxhp0}`);

let maxhp31 = baseStatCalc(pkmn.HP, 31, 70);

let mCR = modCatchRate(maxhp0, pkmn.CatchRate, ballModifier);

let sp = shakeProb(mCR);

console.log(`Mod Catch Rate for pkmn with max hp: ${maxhp0}, catch rate: ${pkmn.CatchRate}, and ball modifier: ${ballModifier}, is ${mCR}, with shake prob: ${sp}`);


message.channel.send(`Percent chance to catch ${pkmn.Name} with a pokeball is ${capProb(sp, mCR)}%`);
console.log(pkmn);
*/
/*
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
    let calc = require("./modules/calculator.js");
    if (args.length == 0)
    {
      message.channel.send("Please enter a Pokémon to catch followed by a ball of your choice.");
      return;
    }

    else if (args.length == 1)
    {
      let mon = pokemon.find((pk) => {return pk.name.toLowerCase() == args[0].toLowerCase()});
      console.log(mon);
    }
  }

  else
  {

  }
});

client.login(config.token);
*/

