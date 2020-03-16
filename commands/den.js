module.exports = {
  name: "Den Information Command",
  cmdName: "den",
  aliases: ["dens"],
  description: "Shows a list of Pokémon that belong to a den including their HAs.",
  args: 1,
  usage: "{{prefix}}den [Pokémon Name]\n{{prefix}}den [Den Number]",
  example: "{{prefix}}den charizard\n{{prefix}}den 69",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};

const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");

// Den Command Handler: Utilizes Pokedata's fetch and EmbedHelper's
// createEmbed to deliver an embed with corresponding den information.
const run = (client, message, args, settings) => {


  // Fetch for both Den & Pkmn, then create corresponding embeds. Return no
  // arg otherwise.
  const den = pokedata.fetch("den", args);
  const pkmnObj = pokedata.fetch("pkmn", args, settings);

  if (den)
  {
    const embed = embedHelper.createEmbed("den", client, den);
    message.channel.send(embed)
      .then()
      .catch(console.error);
    return;
  }

  else if (pkmnObj)
  {
    const pkmn = pkmnObj.pkmn;
    if (pkmn.dens.sword.length == 0 && pkmn.dens.shield.length == 0)
    {
      message.channel.send(`**${pkmn.name}** is not in any current dens.`)
        .then()
        .catch(console.error);
      return;
    }

    const embed = embedHelper.createEmbed("denPkmn", client, [pkmnObj, pokedata.dens]);
    message.channel.send(embed)
      .then()
      .catch(console.error);
    return;
  }

  else
  {
    message.channel.send(botspeech.denNoArg)
      .then()
      .catch(console.error);
    return;
  }
};