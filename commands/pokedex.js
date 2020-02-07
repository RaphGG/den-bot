const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.
// TODO: Fix flags maybe?

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);

  if (!args || args.length < 1)
    return message.channel.send(botspeech.pokedexNoArg);

  else
  {
    let pkmnObj = pokedata.fetch("pkmn", args, settings);

    if (pkmnObj)
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }
}