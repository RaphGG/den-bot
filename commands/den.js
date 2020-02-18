const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");


// Den Command Handler: Utilizes Pokedata's fetch and EmbedHelper's
// createEmbed to deliver an embed with corresponding den information.
exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);

  // No arg check.
  if (!args || args.length < 1)
    return message.reply(botspeech.denNoArg);

  else
  {
    // Fetch for both Den & Pkmn, then create corresponding embeds. Return no
    // arg otherwise.
    const den = pokedata.fetch("den", args);
    const pkmnObj = pokedata.fetch("pkmn", args, settings);

    if (den)
    {
      const embed = embedHelper.createEmbed("den", client, den);
      return message.channel.send(embed);
    }

    else if (pkmnObj)
    {
      const pkmn = pkmnObj.pkmn;
      if (pkmn.dens.sword.length == 0 && pkmn.dens.shield.length == 0)
        return message.channel.send(`**${pkmn.name}** is not in any current dens.`);

      const embed = embedHelper.createEmbed("denPkmn", client, [pkmnObj, pokedata.dens]);
      return message.channel.send(embed);
    }

    else
      return message.channel.send(botspeech.denNoArg);
  }
};