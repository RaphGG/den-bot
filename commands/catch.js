module.exports = {
  name: "Pokémon Catch Rate Command",
  cmdName: "catch",
  aliases: ["rate"],
  description: "Shows a detailed summary of catch rates for a given Pokémon & Ball.",
  args: 1,
  usage: "{{prefix}}catch [Pokémon Name] (Form) (Poké-Ball)",
  example: "{{prefix}}catch zard gmax lux",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};

const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");

// Catch Command Handler: Utilizes Pokedata's fetch, EmbedHelper's
// createEmbed, and Calulator's bestBalls functions to compute
// catch probabilities for given pokemon, and deliver them in
// a neat embed.
const run = (client, message, args, settings) => {
  // Check and search for ball at end of given arguments.
  const ball = pokedata.fetch("ball", args.slice(args.length - 1));
  if (ball)
  {
    // If a ball was found, remove from arguments list and fetch
    // a given pokemon. Return catch rate for specified ball.
    args.pop();
    const pkmnObj = pokedata.fetch("pkmn", args, settings);
    if (!pkmnObj)
    {
      message.channel.send(botspeech.pkmnNotFound)
        .then()
        .catch(console.error);
      return;
    }

    else
    {
      calc.bestBall(pkmnObj, ball);
      message.channel.send(embedHelper.createEmbed("ball", client, [pkmnObj, ball]))
        .then()
        .catch(console.error);
      return;
    }
  }

  else
  {
    // No ball was found, fetch a given pokemon and return Top 4
    // Catch Rate Embed.
    const pkmnObj = pokedata.fetch("pkmn", args, settings);
    if (!pkmnObj)
    {
      message.channel.send(botspeech.ballOrPkmnNotFound)
        .then()
        .catch(console.error);
      return;
    }

    else
    {
      const bestBalls = calc.bestBalls(pkmnObj);
      const embed = embedHelper.createEmbed("top4", client, [pkmnObj, bestBalls]);
      message.channel.send(embed)
        .then()
        .catch(console.error);
      return;
    }
  }
};