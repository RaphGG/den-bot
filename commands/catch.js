const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.
// TODO: Fix flags maybe?

const bb = "bestballs";

// Command handler for %catch method. Control structure on
// number of paramters passed. Utilizes pokedata's fetch and
// calculator's bestballs/ball for the majority of computation.
// Also uses embedHelper's createEmbed for the bot's responses.
exports.run = (client, message, args) => {

  if (!args || args.length < 1)
    return message.channel.send(botspeech.catchNoArg);

  else if (args.length == 1)
  {
    let pkmnObj = pokedata.fetch("pkmn", args);
    if (!pkmnObj.pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else
    {
      let bestBalls = calc.bestBalls(pkmnObj);
      let embed = embedHelper.createEmbed(bb, [pkmnObj, bestBalls], client);
      return message.channel.send(embed);
    }
  }

  else if (args.length == 2)
  {
    let pkmnObj = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmnObj2 = pokedata.fetch("pkmn", args)
    let ball = pokedata.fetch("ball", args.slice(1));

    if (pkmnObj.pkmn)
    {
      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else
        return message.channel.send(calc.bestBall(pkmnObj, ball));
    }

    else if (pkmnObj2.pkmn)
    {
      let bestBalls = calc.bestBalls(pkmnObj2);
      let embed = embedHelper.createEmbed(bb, [pkmnObj2, bestBalls], client);
      return message.channel.send(embed);
    }
      

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmnObj = pokedata.fetch("pkmn", args.slice(0, 2));
    let ball = pokedata.fetch("ball", args.slice(2));
    
    if (!pkmnObj.pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (!ball)
      return message.channel.send(botspeech.ballNotFound);

    else
      return message.channel.send(calc.bestBall(pkmnObj, ball));
  }
}