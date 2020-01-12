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

ingamePkmn.forEach(pkmn => {
  let gf = "(Galarian Form)";
  let nameLength = pkmn.Name.length;

  if (pkmn.Name.endsWith(gf))
    pkmn.Name = pkmn.Name.slice(0, (nameLength - gf.length-1));

});

var ballNames = new Array();

balls.forEach(ball => {
  let ballNameLength = ball.name.length;
  let ballNameFull = ball.name.replace(" ", "").toLowerCase();
  let ballNameAbbr = ball.name.substring(0, (ballNameLength - "Ball".length-1)).toLowerCase();

  ballNames.push(ball.name);
  ballNames.push(ballNameFull);
  ballNames.push(ballNameAbbr);
});

var pkmnNotFound = "The Pokémon requested was either not found or not available in current dens.";
var ballNotFound = "The Poké-Ball requested was not found.";
var notFound = "The command or argument requested was not found.";
var gigaKeywords = ["g", "-g", "g-", "giga", "gigantamax", "gmax"];

const baseStatCalc = (stat, iv, level) => {
  let x = ( ( (2 * stat) + iv ) * level) / 100;
  return Math.floor(x) + level + 10;
}

const CatchRateCalc = (maxhp, currhp, catchRate, ballMod) => {
  return ((3*maxhp - 2*currhp) * (catchRate * ballMod)) / (3*maxhp);
}

const shakeProbCalc = (catchRate) => {
  let b = 65536 / Math.pow((255/catchRate), 0.1875)
  return Math.floor(b);
}

const capProbCalc = (shakeProb, modCatchRate) => {
  if (modCatchRate >= 100 || shakeProb >= 65536)
    return 100;

  return (Math.pow( (shakeProb/65535), 4) * 100);
}

const bestBallsCalc = (pkmn, gFlag) => {
  let maxhp0 = baseStatCalc(pkmn.HP, 0, 30);
  let maxhp31 = baseStatCalc(pkmn.HP, 31, 70);

  let bestBalls = balls.filter(x => {
    let notMB = x.name != "Master Ball";
    let notQB = x.name != "Quick Ball";
    return x.modifier >= 3 && notMB && notQB;
  });
  bestBalls.sort((x, y) => y.modifier > x.modifier);

  let messageToSend = gFlag? `The best Poké-Balls for catching G-Max ${pkmn.Name} are:` : `The best Poké-Balls for catching ${pkmn.Name} are:`;

  bestBalls.forEach(ball => {
    let pkmnCatchRate = gFlag? 3 : pkmn.CatchRate;
    let modCatchRate0 = CatchRateCalc(maxhp0, 1, pkmnCatchRate, ball.modifier);

    let modCatchRate31 = CatchRateCalc(maxhp31, 1, pkmnCatchRate, ball.modifier);

    let shakeProb0 = shakeProbCalc(modCatchRate0);
    let shakeProb31 = shakeProbCalc(modCatchRate31);

    catchProb0 = capProbCalc(shakeProb0, modCatchRate0).toFixed(2);

    catchProb31 = capProbCalc(shakeProb31, modCatchRate31).toFixed(2);

    ball.catchProb = `${catchProb0}% ~ ${catchProb31}%`;

    messageToSend = messageToSend.concat(`\n${ball.name}: ${ball.catchProb}`);
  });

  return messageToSend;
}

const bestBallCalc = (pkmn, ball, gFlag) => {
  let maxhp0 = baseStatCalc(pkmn.HP, 0, 30);
  let maxhp31 = baseStatCalc(pkmn.HP, 31, 70);

  let pkmnCatchRate = gFlag? 3 : pkmn.CatchRate;

  let modCatchRate0 = CatchRateCalc(maxhp0, 1, pkmnCatchRate, ball.modifier);
  let modCatchRate31 = CatchRateCalc(maxhp31, 1, pkmnCatchRate, ball.modifier);

  let shakeProb0 = shakeProbCalc(modCatchRate0);
  let shakeProb31 = shakeProbCalc(modCatchRate31);

  catchProb0 = capProbCalc(shakeProb0, modCatchRate0).toFixed(2);
  catchProb31 = capProbCalc(shakeProb31, modCatchRate31).toFixed(2);

  ball.catchProb = `${catchProb0}% ~ ${catchProb31}%`;

  let messageToSend = gFlag? `The probability of catching G-Max ${pkmn.Name} with a ${ball.name} is: ${ball.catchProb}` : `The probability of catching ${pkmn.Name} with a ${ball.name} is: ${ball.catchProb}` 

  return messageToSend;
}

const ballFinder = (ballName) => {
  return balls.find(ball => {
    if (ball.name == ballName)
      return true;

    let a = ball.name.toLowerCase().replace(" ball", "");
    let b = ballName.replace("ball", "");
    return a == b;
  });
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
        message.channel.send(pkmnNotFound);
        return;
      }

      let messageToSend = bestBallsCalc(pkmn, false);

      message.channel.send(messageToSend);
      return;

    }

    else if (args.length == 2)
    {
      let possiblePkmnName = (args[0] + " " + args[1]).toLowerCase();
      let possiblePkmn = ingamePkmn.find(x => {
        return x.Name.toLowerCase() == possiblePkmnName
      });

      let ballName = ballNames.find(name => {
        return name.toLowerCase() == args[1].toLowerCase();
      });

      if (gigaKeywords.includes(args[0].toLowerCase()))
      {
        let pkmn = ingamePkmn.find(x => {return x.Name.toLowerCase() == args[1].toLowerCase()});
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
          return x.Name.toLowerCase() == args[0].toLowerCase();
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
    }

    else if (args.length == 3)
    {

      if (gigaKeywords.includes(args[0].toLowerCase()))
      {
        let possiblePkmnName = (args[1] + " " + args[2]).toLowerCase();
        let possiblePkmn = ingamePkmn.find(x => {
          return x.Name.toLowerCase() == possiblePkmnName
        });
        let pkmn = ingamePkmn.find(x => {
          return x.Name.toLowerCase() == args[1].toLowerCase();
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
    }
  }
});
client.login(config.token);