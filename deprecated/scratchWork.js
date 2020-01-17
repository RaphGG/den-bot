const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();
client.config = config;

/*
let pkmnCatchRate = new Array();
let allPkmn = new Array();

let output = fs.readFileSync("./data/data Pokemon.txt", "utf8");
let tokens = output.split(/ +/g);

const availablePkmn = tokens.filter((token) => {return !token.match(/^[0-9]+$/)});

output = fs.readFileSync("./data/data Catch Rate.txt", "utf8");
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

output = fs.readFileSync("./data/totalbin.json");
allPkmn = JSON.parse(output);
//console.log(allPkmn.pokemon);

//console.log(pkmnCatchRate);

allPkmn.pokemon.forEach(mon => {
  mon.catchRate = pkmnCatchRate.find(x => mon.ID == x.id).catchRate;
});

let newData = JSON.stringify(allPkmn);
fs.writeFileSync("./data/pokemon.json", newData);
let p = allPkmn.pokemon.filter(mon => {return availablePkmn.includes(mon.name)});

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

let maxhp0 = baseStatCalc(pkmn.baseStats.hp, 0, 30);
console.log(`Max HP at iv 0, level 30 is: ${maxhp0}`);

let maxhp31 = baseStatCalc(pkmn.baseStats.hp, 31, 70);

let mCR = modCatchRate(maxhp0, pkmn.catchRate, ballModifier);

let sp = shakeProb(mCR);

console.log(`Mod Catch Rate for pkmn with max hp: ${maxhp0}, catch rate: ${pkmn.catchRate}, and ball modifier: ${ballModifier}, is ${mCR}, with shake prob: ${sp}`);


message.channel.send(`Percent chance to catch ${pkmn.name} with a pokeball is ${capProb(sp, mCR)}%`);
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

    message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./data/dens/den${args[0]}.png`]});
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

/*
let possiblePkmnName = (args[0] + " " + args[1]).toLowerCase();
let possiblePkmn = ingamePkmn.find(x => {
  return x.name.toLowerCase() == possiblePkmnName
});

let ballName = ballNames.find(name => {
  return name.toLowerCase() == args[1].toLowerCase();
});

if (gigaKeywords.includes(args[0].toLowerCase()))
{
  let pkmn = ingamePkmn.find(x => {return x.name.toLowerCase() == args[1].toLowerCase()});
  if (pkmn == null)
  {
    message.channel.send(pkmnNotFound);
    return;
  }

  let messageToSend = bestBallsCalc(pkmn, true);

  message.channel.send(messageToSend);
  return;
}

else if (possiblePkmn != null)
{
  let messageToSend = bestBallsCalc(possiblePkmn, false);
  message.channel.send(messageToSend);
  return;
}

else if (ballName != null)
{
  let pkmn = ingamePkmn.find(x => {
    return x.name.toLowerCase() == args[0].toLowerCase();
  });

  let ball = ballFinder(ballName);

  if (pkmn == null)
  {
    message.channel.send(pkmnNotFound);
    return;
  }

  let messageToSend = bestBallCalc(pkmn, ball, false);

  message.channel.send(messageToSend);
}

else
{
  message.channel.send(notFound);
}
*/

/*
if (gigaKeywords.includes(args[0].toLowerCase()))
{
  let possiblePkmnName = (args[1] + " " + args[2]).toLowerCase();
  let possiblePkmn = ingamePkmn.find(x => {
    return x.name.toLowerCase() == possiblePkmnName
  });
  let pkmn = ingamePkmn.find(x => {
    return x.name.toLowerCase() == args[1].toLowerCase();
  });

  if (pkmn == null && possiblePkmn == null)
  {
    message.channel.send(pkmnNotFound);
    return;
  }

  else if (pkmn)
  {
    let ballName = ballNames.find(name => {
      return name.toLowerCase() == args[2].toLowerCase();
    });

    if (ballName == null)
    {
      message.channel.send(ballNotFound);
      return;
    }

    let ball = ballFinder(ballName);

    let messageToSend = bestBallCalc(pkmn, ball, true);

    message.channel.send(messageToSend);
  }

  else
  {
    let messageToSend = bestBallsCalc(possiblePkmn, true);
    message.channel.send(messageToSend);
    return;
  }
}
*/

/*
console.log(`Grass: ${lists.Grass.length}`);
console.log(`Water1: ${lists.Water1.length}`);
console.log(`Water2: ${lists.Water2.length}`);
console.log(`Water3: ${lists.Water3.length}`);
console.log(`Fairy: ${lists.Fairy.length}`);
console.log(`Field: ${lists.Field.length}`);
console.log(`Dragon: ${lists.Dragon.length}`);
console.log(`Ditto: ${lists.Ditto.length}`);
console.log(`Flying: ${lists.Flying.length}`);
console.log(`Undiscovered: ${lists.Undiscovered.length}`);
console.log(`Monster: ${lists.Monster.length}`);
console.log(`Mineral: ${lists.Mineral.length}`);
console.log(`Amorphous: ${lists.Amorphous.length}`);
console.log(`Bug: ${lists.Bug.length}`);
console.log(`Humanlike: ${lists.Humanlike.length}`);




pokemon.forEach(x => {
  let formIndex = x.name.indexOf("-");
  let tempName = x.name;
  if (formIndex+1)
    tempName = x.name.slice(0, formIndex);

  if (egg.Monster.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Monster";
    else
      x.eggGroup1 = "Monster";
  }

  if (egg.Humanlike.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Human-Like";
    else
      x.eggGroup1 = "Human-Like";
  }
  if (egg.Water1.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Water 1";
    else
      x.eggGroup1 = "Water 1";
  }
  if (egg.Water2.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Water 2";
    else
      x.eggGroup1 = "Water 2";
  }
  if (egg.Water3.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Water 3";
    else
      x.eggGroup1 = "Water 3";
  }
  if (egg.Bug.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Bug";
    else
      x.eggGroup1 = "Bug";
  }
  if (egg.Mineral.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Mineral";
    else
      x.eggGroup1 = "Mineral";
  }
  if (egg.Flying.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Flying";
    else
      x.eggGroup1 = "Flying";
  }
  if (egg.Amorphous.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Amorphous";
    else
      x.eggGroup1 = "Amorphous";
  }
  if (egg.Field.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Field";
    else
      x.eggGroup1 = "Field";
  }
  if (egg.Fairy.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Fairy";
    else
      x.eggGroup1 = "Fairy";
  }
  if (egg.Ditto.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Ditto";
    else
      x.eggGroup1 = "Ditto";
  }
  if (egg.Grass.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Grass";
    else
      x.eggGroup1 = "Grass";
  }
  if (egg.Dragon.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Dragon";
    else
      x.eggGroup1 = "Dragon";
  }
  if (egg.Undiscovered.includes(tempName) && (!x.eggGroup1 || !x.eggGroup2))
  {
    if (x.eggGroup1)
      x.eggGroup2 = "Undiscovered";
    else
      x.eggGroup1 = "Undiscovered";
  }
});

let newdata = JSON.stringify(pokemon);
fs.writeFileSync("./data/eggp.json", newdata);

pokemon.forEach(x => {
  let formIndex = x.name.indexOf("-");
  let tempName = x.name;
  if (formIndex+1)
    tempName = x.name.slice(0, formIndex);

  if (ratio.maleOnly.includes(tempName))
    x.genderRatio = "100% ♂";

  if (ratio.fem1male7.includes(tempName))
    x.genderRatio = "87.5% ♂ : 12.5% ♀";

  if (ratio.fem1male3.includes(tempName))
    x.genderRatio = "75% ♂ : 25% ♀";

  if (ratio.fem1male1.includes(tempName))
    x.genderRatio = "50% ♂ : 50% ♀";

  if (ratio.fem3male1.includes(tempName))
    x.genderRatio = "25% ♂ : 75% ♀";

  if (ratio.fem7male1.includes(tempName))
    x.genderRatio = "12.5% ♂ : 87.5% ♀";

  if (ratio.femOnly.includes(tempName))
    x.genderRatio = "100% ♀";

  if (ratio.enby.includes(tempName))
    x.genderRatio = "100% ⚲";
});

console.log(pokemon);
let newdata = JSON.stringify(pokemon);
fs.writeFileSync("./data/ratiop.json", newdata);
*/