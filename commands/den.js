const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");

exports.run = (client, message, args) => {
  if (!args || args.length < 1)
    return message.reply(botspeech.denNoArg);

  else
  {
    if (args[0] > 1 && args[0] < 93)
     return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./data/dens/den${args[0]}.png`]});

    let pkmn = pokedata.fetch("pkmn", args).pkmn;

    if (!pkmn)
      return message.channel.send(botspeech.argNotFound);

    if (pkmn.dens.sword.length == 0 && pkmn.dens.shield.length == 0)
      return message.channel.send(`**${pkmn.name}** is not in any current dens.`);

    let dens = "";
    if (pkmn.dens.sword.length > 0)
    {
      let swordDens = "Sword: \`";
      pkmn.dens.sword.forEach(den => {
        swordDens = swordDens + den + ', ';
      });
      swordDens = swordDens.slice(0, swordDens.lastIndexOf(', ')) + '\`';
    
      dens = dens + swordDens + '\n';
    }

    if (pkmn.dens.shield.length > 0)
    {
      let shieldDens = "Shield: \`";
      pkmn.dens.shield.forEach(den => {
        shieldDens = shieldDens + den + ', ';
      });
      shieldDens = shieldDens.slice(0, shieldDens.lastIndexOf(', ')) + '\`';
      dens = dens + shieldDens;
    }

    return message.channel.send(`**${pkmn.name}** is in the following dens:\n${dens}`);
  }
}