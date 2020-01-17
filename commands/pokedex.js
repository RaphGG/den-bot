const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const Discord = require("discord.js");


exports.run = (client, message, args) => {

  let dexEmbed = new Discord.RichEmbed();
  dexEmbed.setFooter("Alcremie-B, by Droopy", client.user.avatarURL);

  if (!args || args.length < 1)
    return message.channel.send(botspeech.pokedexNoArg);

  else if (args.length == 1)
  {
    let pkmn = pokedata.pokemon.find(x => {
      return x.name.toLowerCase() == args[0].toLowerCase();
    });

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    dexEmbed.setColor(botspeech.colorFinder(pkmn));
    dexEmbed.setImage(botspeech.imageFinder(pkmn));

    let type1 = client.emojis.find(x => {
      return x.name == pkmn.type1;
    });

    let type2 = client.emojis.find(x => {
      return x.name == pkmn.type2;
    });

    let types = type2? type1 + " " + type2 : type1;

    let title = `**__#${pkmn.dexId} • ${pkmn.name} __**` + types;
    dexEmbed.setTitle(title);

    let statHeader1 = `__\`HP     Atk     Def\`__`;
    let statHeader2 = `__\`SpA    SpD     Spe\`__`;

    let baseStats1 = `\`${pkmn.baseStats.hp.toString().padEnd(7, " ")}${pkmn.baseStats.atk.toString().padEnd(8, " ")}${pkmn.baseStats.def.toString().padEnd(3, " ")}\``;

    let baseStats2 = `\`${pkmn.baseStats.spA.toString().padEnd(7, " ")}${pkmn.baseStats.spD.toString().padEnd(8, " ")}${pkmn.baseStats.spe.toString().padEnd(3, " ")}\``;


    let baseStatTotal = `__\`Total: ${pkmn.baseStats.tot}\`__`;

    let baseStats = statHeader1 + "\n" + baseStats1 + "\n" + statHeader2 + "\n" + baseStats2 + "\n" + baseStatTotal;
    dexEmbed.addField("Base Stats", baseStats, true);
    
    let genderRatio = `Gender Ratio: \`${pkmn.genderRatio}\``;
    let height = `Height: \`${pkmn.height}m\``;
    let weight = `Weight: \`${pkmn.weight}kg\``;
    let catchRate = `Catch Rate: \`${pkmn.catchRate}\``;
    let gen = `Generation: \`${pkmn.generation}\``;

    let miscInfo = genderRatio + "\n" + height + "\n" + weight + "\n" + catchRate + "\n" + gen;

    dexEmbed.addField("Misc. Info", miscInfo, true);

    let abilities = pkmn.possibleAbilities.join("/");

    dexEmbed.addField("Possible Abilities", abilities, true);

    return message.channel.send( dexEmbed );
  }

  else if (args.length == 2)
  {
    let pkmnName = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.pokemon.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    dexEmbed.setColor(botspeech.colorFinder(pkmn));
    dexEmbed.setImage(botspeech.imageFinder(pkmn));

    let type1 = client.emojis.find(x => {
      return x.name == pkmn.type1;
    });

    let type2 = client.emojis.find(x => {
      return x.name == pkmn.type2;
    });

    let types = type2? type1 + " " + type2 : type1;

    let title = `**__#${pkmn.dexId} • ${pkmn.name} __**` + types;
    dexEmbed.setTitle(title);

    let statHeader1 = `__\`HP     Atk     Def\`__`;
    let statHeader2 = `__\`SpA    SpD     Spe\`__`;

    let baseStats1 = `\`${pkmn.baseStats.hp.toString().padEnd(7, " ")}${pkmn.baseStats.atk.toString().padEnd(8, " ")}${pkmn.baseStats.def.toString().padEnd(3, " ")}\``;

    let baseStats2 = `\`${pkmn.baseStats.spA.toString().padEnd(7, " ")}${pkmn.baseStats.spD.toString().padEnd(8, " ")}${pkmn.baseStats.spe.toString().padEnd(3, " ")}\``;

    let baseStatTotal = `__\`Total: ${pkmn.baseStats.tot}\`__`;

    let baseStats = statHeader1 + "\n" + baseStats1 + "\n" + statHeader2 + "\n" + baseStats2 + "\n" + baseStatTotal;
    dexEmbed.addField("Base Stats", baseStats, true);
    
    let genderRatio = `Gender Ratio: \`${pkmn.genderRatio}\``;
    let height = `Height: \`${pkmn.height}m\``;
    let weight = `Weight: \`${pkmn.weight}kg\``;
    let catchRate = `Catch Rate: \`${pkmn.catchRate}\``;
    let gen = `Generation: \`${pkmn.generation}\``;

    let miscInfo = genderRatio + "\n" + height + "\n" + weight + "\n" + catchRate + "\n" + gen;

    dexEmbed.addField("Misc. Info", miscInfo, true);

    let abilities = pkmn.possibleAbilities.join("/");

    dexEmbed.addField("Possible Abilities", abilities, true);

    return message.channel.send( dexEmbed );
  }
}