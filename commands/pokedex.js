const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.
// TODO: Fix flags maybe?

exports.run = (client, message, args) => {

  if (!args || args.length < 1)
    return message.channel.send(botspeech.pokedexNoArg);

  else if (args.length == 1)
  {
    let pkmnObj = pokedata.fetch("pkmn", args);

    if (!pkmnObj.pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));
  }

  else if (args.length == 2)
  {
    let pkmnObj = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmnObj2 = pokedata.fetch("pkmn", args);
    pkmnObj.shiny = args[1].match(/shiny/gi);

    if (pkmnObj.pkmn)
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));

    else if (pkmnObj2.pkmn)
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj2));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmnObj = pokedata.fetch("pkmn", args.slice(0, 2));
    pkmnObj.shiny = args[2].match(/shiny/gi);

    if (!pkmnObj.pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else
      return message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj));
  }
}