const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);
  if (!args || args.length < 1)
    return message.reply(botspeech.denNoArg);

  else
  {
    let den = pokedata.fetch("den", args);
    let pkmnObj = pokedata.fetch("pkmn", args, settings);

    if (den)
    {
      let embed = embedHelper.createEmbed("den", client, den);
      return message.channel.send(embed);
    }

    else if (pkmnObj)
    {
      let pkmn = pkmnObj.pkmn;
      if (pkmn.dens.sword.length == 0 && pkmn.dens.shield.length == 0)
        return message.channel.send(`**${pkmn.name}** is not in any current dens.`);

      
      let embed = embedHelper.createEmbed("denPkmn", client, [pkmnObj, pokedata.dens]);
      return message.channel.send(embed);
    }

    else
      return message.channel.send(botspeech.denNoArg);
  }
}