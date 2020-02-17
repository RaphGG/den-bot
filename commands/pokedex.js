const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");

// Pokedex Command Handler: Utilizes Pokedata's fetch & EmbedHelper's
// createEmbed to deliver a Pokedex entry of a given pokemon.
exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);

  // No arg check.
  if (!args || args.length < 1)
    return message.channel.send(botspeech.pokedexNoArg);

  // Fetch, Create, and Send.
  else
  {
    const pkmnObj = pokedata.fetch("pkmn", args, settings);

    if (pkmnObj)
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }
};