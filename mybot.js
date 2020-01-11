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

      let maxhp0 = baseStatCalc(pkmn.HP, 0, 30);
      let maxhp31 = baseStatCalc(pkmn.HP, 31, 70);

      let bestBalls = balls.filter(x => {return x.modifier >= 3.5});
      bestBalls.sort((x, y) => y.modifier > x.modifier);

      let messageToSend = `The top 8 balls for catching ${pkmn.Name} are:`

      bestBalls.forEach(ball => {
        let modCatchRate0 = CatchRateCalc(maxhp0, 1, pkmn.CatchRate, ball.modifier);

        let modCatchRate31 = CatchRateCalc(maxhp31, 1, pkmn.CatchRate, ball.modifier);

        let shakeProb0 = shakeProbCalc(modCatchRate0);
        let shakeProb31 = shakeProbCalc(modCatchRate31);

        catchProb0 = capProbCalc(shakeProb0, modCatchRate0).toFixed(2);

        catchProb31 = capProbCalc(shakeProb31, modCatchRate31).toFixed(2);

        ball.catchProb = `${catchProb0}% ~ ${catchProb31}%`;

        messageToSend = messageToSend.concat(`\n${ball.name}: ${ball.catchProb}`);

        /*
        console.log(`Everything:\nBall: ${ball.name}\nmodCatchRate0: ${modCatchRate0}\nmodCatchRate31: ${modCatchRate31}\nshakeProb0: ${shakeProb0}\nshakeProb31: ${shakeProb31}\n`);
        */
      });

      message.channel.send(messageToSend);

      /*
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
    }
  }

  else if (args.length == 2)
  {
    let pkmn = ingamePkmn.find(x => {return x.Name.toLowerCase() == args[0].toLowerCase()});

    //let ball = balls.find(x => ) rethink this.
    if (pkmn == null)
    {
      message.channel.send("This Pokémon is not available in current dens.");
      return;
    }


  }
});

client.login(config.token);