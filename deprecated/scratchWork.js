const fs = require("fs");
const pokelists = require("../data/lists.js");

let arr = [];

pokelists.formJson.forEach(pkmn => {
  arr = arr.concat(pkmn.forms);
});

let set = new Set;

arr.forEach(e => (set.add(e)));
let p = [];
set.forEach(e => (p.push(e)))


let newdata = JSON.stringify(p);
fs.writeFileSync("./data/test.json", newdata);



/*
let pokemonlist = settings.denpkmnonly? denPokemon : pokemon;
    let words = "";
    let start = "";
    let tempshiny = false;

    args.forEach(term => {
      if (star.test(term))
        tempshiny = true;
      
      term = term.replace(/[^A-Za-z0-9']/gi, "");
      term = term.replace(/galar/gi, "Galarian");
      term = term.replace(/alola/gi, "Alolan");
      term = term.replace(/gmax/gi, "Gigantamax");
  
      words += "\\b" + term + "\\b\|";
      start += "^" + term + "\|";
    });
    console.log(args);

    let shiny = settings.shinypkmnonly? true : tempshiny;

  
    let wordreg = new RegExp(words.substring(0, words.lastIndexOf("\|")), "gi");

    let startreg = new RegExp(start.substring(0, start.lastIndexOf("\|")), "gi");

  
    let form = pokelists.forms.find(form => (wordreg.test(form)));

    if (!form)
    {
      let pkmn = pokemonlist.find(mon => (wordreg.test(mon.name)));
      if (!pkmn)
        return null;

      else
        return {pkmn: pkmn, form: form, shiny: shiny};
    }

    else if (pokelists.noncosmeticforms.includes(form))
    {
      let formreg = new RegExp("\\w+(?= " + form + ")\|" + "(?<=" + form + " \\w+)", "gi");

      let tempmon = pokemonlist.filter(mon => (formreg.test(mon.name)))
      if (!tempmon || tempmon.length < 1)
        return null;


      let joinargs = args.join(" ");
      console.log(joinargs);

      let pkmnName = joinargs.replace(formsreg, "").trim();
      console.log(pkmnName)

      let pkmnreg = new RegExp(pkmnName, "gi");
      console.log(pkmnreg)

      let pkmn = tempmon.find(mon => (pkmnreg.test(mon.name)));

      if (!pkmn)
        return null;


      return {pkmn: pkmn, form: form, shiny: shiny};
    }

    else
    {
      let pkmn = pokemonlist.find(mon => (wordreg.test(mon.name) && mon.forms.includes(form)));

      if (!pkmn)
        return null

      else
        return {pkmn: pkmn, form: form, shiny: shiny};
    }
    
let name = "";
  if (args.length >= 1)
    args = args.join("");

  name = args.replace(nonAlpha, "").toLowerCase();
  let cform = name.match(cosmeticForms).find(form => {return form != ''});

  if (cform)
  {
    name = name.replace(cosmeticForms, "");
    if (cform == "gmax")
      cform = "gigantamax";
  }

  if (flag == "pkmn")
  {
    let pokemonlist = settings.denpkmnonly? denPokemon : pokemon;
    let pkmn = pokemonlist.find(x => {
      let nameMatch = x.name.replace(nonAlpha, "").toLowerCase() == name;
      let formMatch = cform? x.forms.some(form => {return form.replace(/ /g, '').toLowerCase() == cform}) : true;
      return nameMatch && formMatch;
    });
    
    if (!pkmn)
      return null;

    */
    //let shiny = settings.shinypkmnonly? true : args.match(/\*/g);
    /*
    return {
      pkmn: pkmn,
      cform: cform,
      shiny: shiny
    }
  }

  else if (flag == "ball")
  {
    return balls.find(x => {
      return x.name.replace(nonAlpha, "").toLowerCase().startsWith(name);
    });
  }

  else if (flag == "den")
  {
    return dens.find(den => {
      return den.den == name;
    });
  }

  else
    return null;
    
const dens = JSON.parse(data);
dens.forEach(den => {
  let newDen = new Object;

  newDen.den = den.den;
  newDen.sword = den.pkmn.slice(0, 12);
  newDen.shield = den.pkmn.slice(12);
  arr.push(newDen);
});

let newdata = JSON.stringify(arr);
fs.writeFileSync("./data/newdens.json", newdata);

      pkmn.dens.sword.forEach(den => {
        swordDens = swordDens + `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });
      
    
      dens = dens + swordDens + '\n';
      if (swordArr.length > 0)
        dens += '\nHA: ' + swordArr.join(", ") + '\n';

      pkmn.dens.shield.forEach(den => {
        shieldDens = shieldDens + `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });
      
      dens = dens + shieldDens;

      if (shieldArr.length > 0)
        dens += '\nHA: ' + shieldArr.join(", ") + '\n';


if (args[0] > 1 && args[0] < 93)
     return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./data/dens/den${args[0]}.png`]});

    let pkmnObj = pokedata.fetch("pkmn", args, settings);

    if (!pkmnObj)
      return message.channel.send(botspeech.denNoArg);

    let pkmn = pkmnObj.pkmn;

    if (pkmn.dens.sword.length == 0 && pkmn.dens.shield.length == 0)
      return message.channel.send(`**${pkmn.name}** is not in any current dens.`);

    let dens = "";
    if (pkmn.dens.sword.length > 0)
    {
      let swordDens = "Sword: \`";
      pkmn.dens.sword.forEach(den => {
        swordDens = swordDens + den + ', ';
      });
      swordDens = swordDens.slice(0, swordDens.lastIndexOf(', ')) + '\`';
    
      dens = dens + swordDens + '\n';
    }

    if (pkmn.dens.shield.length > 0)
    {
      let shieldDens = "Shield: \`";
      pkmn.dens.shield.forEach(den => {
        shieldDens = shieldDens + den + ', ';
      });
      shieldDens = shieldDens.slice(0, shieldDens.lastIndexOf(', ')) + '\`';
      dens = dens + shieldDens;
    }

    return message.channel.send(`**${pkmn.name}** is in the following dens:\n${dens}`);
const Discord = require("discord.js");
const config = require("./config.json");
// Bot Creation
const client = new Discord.Client();
client.config = config;

// Event loader with client.on setup in a for loop. No need for repeated code.
// To ensure that event.bind() works, make sure event modules are written
// with a succint standard.
fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err);

  console.log(`Loading ${files.length} events:`);

  files.forEach((file, i) => {
    if (!file.endsWith("js")) return;

    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Attempting to load event ${i+1} of ${files.length}: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

// Mapping commands as (K, V) -> (CommandName, CommandModule)
client.commands = new Map();

// Command loader to map commands as above into a Discord.js Collection 
// which is held by the client (bot)
fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);

  console.log(`Loading ${files.length} commands:`);

  files.forEach((file, i) => {
    if (!file.endsWith("js")) return;

    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${i+1} of ${files.length}: ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.login(config.tokentest);

exports.errHandler = (flag, args) => {
  if (flag == "notFounds")
  {
    let msg = "";
    args.forEach()
  } 
}


exports.run = (client, message, args) => {
  if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  if(!client.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`);
};


client.settings = new Map();
let m = new Map();

// Just setting up a default configuration object here, to have somethign to insert.
const pokeraiders = {
  prefix: "%",
  roles:{
    owner:"648749959205879836",
    admin:"666443360483147808",
    mod:"648749558616162314",
    adminroles:["648749959205879836","666443360483147808","648749558616162314"],
    giveaway:"659252943622635526",
    shiny:"658892950717202452",
    pingableroles:["659252943622635526","658892950717202452"]
  }
}

const pokeraiders = {
  prefix: "%",
  roles:{
    owner:"648749959205879836",
    admin:"666443360483147808",
    mod:"648749558616162314",
    adminroles:["648749959205879836","666443360483147808","648749558616162314"],
    giveaway:"659252943622635526",
    shiny:"658892950717202452",
    pingableroles:["659252943622635526","658892950717202452"]
  },
  denOnly:true
}
client.settings.set("648747323190542338", pokeraiders);

const denbot = {
  roles:{
      owner:"666283334418169879",
      admin:"666465912802639882",
      mod:"666283270215958538",
      adminroles:["666283334418169879","666465912802639882","666283270215958538"],
      giveaway:"666283431147077642",
      shiny:"666283386943438850",
      pingableroles:["666283431147077642","666283386943438850"]
  },
  denOnly:false
}
client.settings.set("663506927912878091", denbot);


  

  else if (args.length == 1)
  {
    let pkmnObj = pokedata.fetch("pkmn", args, settings);

    if (!pkmnObj.pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));
  }

  else if (args.length == 2)
  {
    let pkmnObj = pokedata.fetch("pkmn", args.slice(0, 1), settings);
    let pkmnObj2 = pokedata.fetch("pkmn", args, settings);
    pkmnObj.shiny = args[1].match(/shiny/gi);

    if (pkmnObj.pkmn)
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));

    else if (pkmnObj2.pkmn)
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj2));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }
  

client.on("message", async (message) => {
  // This stops if it's not a guild (obviously), and we ignore all bots.
  // Pretty standard for any bot.
  if(!message.guild || message.author.bot) return;
  
  // We can use ensure() to actually grab the default value for settings,
  // if the key doesn't already exist. 
  const guildConf = client.settings;
  
  // Now we can use the values! 
  // We stop processing if the message does not start with our prefix for this guild.
  if(message.content.indexOf(guildConf.prefix) !== 0) return;

  //Then we use the config prefix to get our arguments and command:
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(guildConf.prefix.length).toLowerCase();
  
  // Commands Go Here
});

// Alright. Let's make a command! This one changes the value of any key
  // in the configuration.
  if(command === "setconf") {
    // Command is admin only, let's grab the admin value: 
    const adminRole = message.guild.roles.find("name", guildConf.adminRole);
    if(!adminRole) return message.reply("Administrator Role Not Found");
    
    // Then we'll exit if the user is not admin
    if(!message.member.roles.has(adminRole.id)) {
      return message.reply("You're not an admin, sorry!");
    }
    
    // Let's get our key and value from the arguments. 
    // This is array destructuring, by the way. 
    const [prop, ...value] = args;
    // Example: 
    // prop: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)
    
    // We can check that the key exists to avoid having multiple useless, 
    // unused keys in the config:
    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }
    
    // Now we can finally change the value. Here we only have strings for values 
    // so we won't bother trying to make sure it's the right type and such. 
    client.settings.set(message.guild.id, value.join(" "), prop);
    
    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }

  if(command === "showconf") {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}\n`;
    });
    message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps}\`\`\``);
  }

    else if (!rolePing.name.startsWith("Shiny") && !rolePing.name.startsWith("Giveaway"))
      return message.channel.send(botspeech.pingableRoles);
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



pokemon.forEach(x => {
  x.dens = {"sword":[], "shield":[]};
});

pokemon.forEach(x => {
  let p = pokeSON.find(y => {return y.name == x.name});
  if (!p)
    return;

  let den = p.dens.split("/");
  if (den.length <= 1)
  {
    if (den[0].startsWith("Sword"))
    {
      let ds = den[0].slice(5).trim().split(/ +g/);
      x.dens.sword = ds;
    }
    else if (den[0].startsWith("Shield"))
    {
      let ds = den[0].slice(6).trim().split(/ +g/);
      x.dens.shield = ds;
    }
    else
    {
      let ds = den[0].trim().split(/ +g/);
      x.dens.sword = ds;
      x.dens.shield = ds;
    }
  }
  else
  {
    let ds = den[0].slice(5).trim().split(/ +g/);
    x.dens.sword = ds;

    ds = den[1].slice(6).trim().split(/ +g/);
    x.dens.shield = ds;
  }

});



pokemon.forEach(x => {
  x.forms = [];
  let p = pokeSON.find(y => {return y.name == x.name});
  if (!p)
    return;

  x.forms = p.forms;
});

console.log(pokemon);


denPokemon.forEach(mon => {
  if (mon.dens.sword.length >= 1)
    mon.dens.sword = mon.dens.sword[0].match(/\b\d{1}\b|\b\d{2}\b/g);

  if (mon.dens.shield.length >= 1)
    mon.dens.shield = mon.dens.shield[0].match(/\b\d{1}\b|\b\d{2}\b/g);
});

let newdata = JSON.stringify(pokemon);
fs.writeFileSync("./data/ver7pokemon.json", newdata);



  switch (flag)
  {
    case "pkmn":
      return pokemon.find(x => {
        let nameMatch = x.name.replace(nonAlpha, "").toLowerCase() == name;
        let formMatch = cform? x.forms.some(form => {return form.toLowerCase() == cform}) : true;
        return nameMatch && formMatch;
      });

    case "ball":
      return balls.find(x => {
        return x.name.replace(nonAlpha, "").toLowerCase().startsWith(name);
      });

    default:
      return null;
  }
  

  

  else if (args.length == 1)
  {
    let pkmn = pokedata.fetch("pkmn", args);

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (args[0].match(/-gmax|-gigantamax/))
      return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));

    else
      return message.channel.send(calc.bestBallsMsg(pkmn, false, catchEmbed));
  }

  else if (args.length == 2)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmn2 = pokedata.fetch("pkmn", args);

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args.slice(1, 2));
      let gmax = args[0].match(/-gmax|-gigantamax/);

      if (gmax)
      {
        if (ball)
          return message.channel.send(calc.bestBallMsg(pkmn, ball, true));

        else 
      }
        return message.channel.send(calc.bestBallMsg(pkmn, ball, false));

      else if (gmax)
      {
        if (!gmaxForm)
          return message.channel.send(botspeech.gmaxNotFound);

        return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));
      }

      else
        return message.channel.send(botspeech.argNotFound + '\n' + botspeech.catchExample2 + '\`\`\`');
    }

    else if (pkmn2)
      return message.channel.send(calc.bestBallsMsg(pkmn2, false, catchEmbed));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmn2 = pokedata.fetch("pkmn", args.slice(0, 2));

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args.slice(1, 2));
      let gmax = pokeLists.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (gmax)
      {
        if (!gmaxForm)
          return message.channel.send(botspeech.gmaxNotFound);

        return message.channel.send(calc.bestBallMsg(pkmn, ball, true));
      }

      else
        return message.channel.send(botspeech.argNotFound + '\n' + botspeech.catchExample3 + '\`\`\`');
    }

    else if (pkmn2)
    {
      let ball = pokedata.fetch("ball", args.slice(2, 3));
      let gmax = pokeLists.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (gmax)
      {
        if (!gmaxForm)
          return message.channel.send(botspeech.gmaxNotFound);

        return message.channel.send(calc.bestBallsMsg(pkmn2, true, catchEmbed));
      }

      else
        return message.channel.send(botspeech.argNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 4)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 2));
    let ball = pokedata.fetch("ball", args.slice(2, 3));
    let gmax = pokeLists.gigaKeywords.includes(args[3].toLowerCase());
    let gmaxForm = pkmn.forms.includes("Gigantamax");

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (!ball)
      return message.channel.send(botspeech.ballNotFound);

    else if (gmax)
    {
      if (!gmaxForm)
        return message.channel.send(botspeech.gmaxNotFound);
      
      return message.channel.send(calc.bestBallMsg(pkmn, ball, true));
    }

    return message.channel.send(botspeech.argNotFound + '\`\`\`');
  }
}


  else if (args.length == 1)
  {
    let pkmn = pokedata.fetch("pkmn", args);

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    return message.channel.send( calc.bestBallsMsg(pkmn, false, catchEmbed) );
  }

  else if (args.length == 2)
  {
    let pkmn = pokedata.fetch("pkmn", args[0]);
    let pkmn2 = pokedata.fetch("pkmn", args);

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args[1])
      let gmax = botspeech.gigaKeywords.includes(args[1].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");
      if (gmax && gmaxForm)
        return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));

      else if (ball)
        return message.channel.send(calc.bestBallMsg(pkmn, ball, false));

      else
        return message.channel.send(botspeech.argNotFound);
    }

    else if (pkmn2)
      return message.channel.send(calc.bestBallsMsg(pkmn2, false, catchEmbed));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmn = pokedata.fetch("pkmn", args[0]);
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args[1]);
      let gmax = botspeech.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      
    }

    else if (pkmn2)
    {
      let ball = pokedata.fetch("ball", args[2]);
      let gmax = botspeech.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (gmax && gmaxForm)
        return message.channel.send(calc.bestBallsMsg(pkmn2, true, catchEmbed));

      else if (ball)
        return message.channel.send(calc.bestBallMsg(pkmn2, ball, false));
      
      else
        return message.channel.send(botspeech.argNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 4)
  {
    let pkmn = pokedata.fetch("pkmn", args[0]);
    let pkmn2 = pokedata.fetch("pkmn", args.slice(0, 1));

    if (pkmn)
    {
      let ballName = (args[1] + " " + args[2]).toLowerCase();
      let ball = calc.ballFinder(ballName);

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (!botspeech.gigaKeywords.includes(args[3].toLowerCase()))
        return message.channel.send(botspeech.argNotFound);

      else
        return message.channel.send( calc.bestBallMsg(pkmn, ball, true) );
    }

    else if (pkmn2)
    {
      let ballName = args[2].toLowerCase();
      let ballName2 = (args[2] + " " + args[3]).toLowerCase();

      let ball = calc.ballFinder(ballName);
      let ball2 = calc.ballFinder(ballName2);

      if (ball2)
        return message.channel.send( calc.bestBallMsg(pkmn2, ball2, false) );

      else if (ball)
      {
        if (botspeech.gigaKeywords.includes(args[3].toLowerCase()))
          return message.channel.send( calc.bestBallMsg(pkmn2, ball, true) );

        else
          message.channel.send(botspeech.argNotFound);
      }

      else
        return message.channel.send(botspeech.ballNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 5)
  {
    let pkmnName = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.pokemon.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    let ballName = (args[2] + " " + args[3]).toLowerCase();
    let ball = calc.ballFinder(ballName);

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (!ball)
      return message.channel.send(botspeech.ballNotFound);

    else if (!botspeech.gigaKeywords.includes(args[4].toLowerCase()))
      return message.channel.send(botspeech.argNotFound);

    else
      return message.channel.send( calc.bestBallMsg(pkmn, ball, true) );
  }
}



const botspeech = require("../modules/botspeech.js");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let denEmbed = new Discord.RichEmbed();
  denEmbed.setFooter("Alcremie-B, by Droopy", client.user.avatarURL);
  denEmbed.setTitle("Den Finder");

  if (args.length == 0 || (args[0] < 1 || args[0] > 93))
    return message.reply(botspeech.denNoArg);

  else
  {
    denEmbed.setDescription(`Den ${args[0]} has the following Pokémon:`);
    denEmbed.file = `./data/dens/den${args[0]}.png`;

    return message.channel.send(denEmbed);

  }
    //return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./data/dens/den${args[0]}.png`]});
};
*/