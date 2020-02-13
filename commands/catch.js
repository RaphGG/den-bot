const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.

// Command handler for %catch method. Control structure on
// number of paramters passed. Utilizes pokedata's fetch and
// calculator's bestballs/ball for the majority of computation.
// Also uses embedHelper's createEmbed for the bot's responses.
exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);

  if (!args || args.length < 1)
    return message.channel.send(botspeech.catchNoArg);

  else
  {
    let ball = pokedata.fetch("ball", args.slice(args.length - 1));
    if (ball)
    {
      args.pop();
      let pkmnObj = pokedata.fetch("pkmn", args, settings);
      if (!pkmnObj)
        return message.channel.send(botspeech.pkmnNotFound);

      else
      {
        calc.bestBall(pkmnObj, ball)
        return message.channel.send(embedHelper.createEmbed("ball", client, [pkmnObj, ball]));
      }
    }

    else
    {
      let pkmnObj = pokedata.fetch("pkmn", args, settings);
      if (!pkmnObj)
        return message.channel.send(botspeech.pkmnNotFound);

      else
      {
        let bestBalls = calc.bestBalls(pkmnObj);
        let embed = embedHelper.createEmbed("top4", client, [pkmnObj, bestBalls]);
        return message.channel.send(embed);
      }
    }
  }
}