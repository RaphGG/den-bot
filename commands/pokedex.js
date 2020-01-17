const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const Discord = require("discord.js");


exports.run = (client, message, args) => {

  let dexEmbed = new Discord.RichEmbed();
  dexEmbed.setFooter("Alcremie-B, by Droopy", client.user.avatarURL);

  if (args.length == 0)
    return message.channel.send(botspeech.pokedexNoArg);

  else if (args.length == 1)
  {
    let pkmn = pokedata.pokemon.find(x => {
      return x.name.toLowerCase() == args[0].toLowerCase();
    });

    if (pkmn == null)
      return message.channel.send(botspeech.pkmnNotFound);

    
    dexEmbed.setTitle(`**__#${pkmn.dexId} • ${pkmn.name} __**`);

    let statHeader1 = `__\`HP     Atk     Def\`__`.replace(/ +g/, "\u2005");
    let statHeader2 = `__\`SpA    SpD     Spe\`__`.replace(/ +g/, "\u2005");
    let baseStats1 = `\`${pkmn.baseStats.hp.toString().padEnd(7, "\u2005")}${pkmn.baseStats.atk.toString().padEnd(8, "\u2005")}${pkmn.baseStats.def}\``;
    let baseStats2 = `\`${pkmn.baseStats.spA.toString().padEnd(7, "\u2005")}${pkmn.baseStats.spD.toString().padEnd(8, "\u2005")}${pkmn.baseStats.spe}\``;
    let baseStatTotal = `__\`Total: ${pkmn.baseStats.tot}\`__`;

    let fieldVal = statHeader1 + "\n" + baseStats1 + "\n" + statHeader2 + "\n" + baseStats2 + "\n" + baseStatTotal;
    dexEmbed.addField("Base Stats", fieldVal, true);

    let type1 = client.emojis.find(x => {
      return x.name == pkmn.type1;
    });

    let type2 = client.emojis.find(x => {
      return x.name == pkmn.type2;
    });

    fieldVal = type2? type1 + " " + type2 : type1;

    dexEmbed.addField("Types(s)", fieldVal, true);

    /*
    fieldVal = pkmn.type2? `\`${pkmn.type1} / ${pkmn.type2}\`` : `\`${pkmn.type1}\``;

    dexEmbed.addField("Type(s)", fieldVal, true);
    

    let abilities = "";

    pkmn.possibleAbilities.forEach(x => {
      abilities = abilities + 
    })

    fieldVal = ;
    */

    return message.channel.send( dexEmbed );
  }

  else if (args.length == 2)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.pokemon.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    let pkmn2 = pokedata.pokemon.find(x => {
      return x.name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let arg1 = args[1].toLowerCase();
      let ball = calc.ballFinder( arg1 );

      if (botspeech.gigaKeywords.includes(arg1))
        return message.channel.send( calc.bestBallsMsg(pkmn, true, catchEmbed) );

      else if (ball)
        return message.reply( calc.bestBallMsg(pkmn, ball, false) );

      else
        return message.channel.send(botspeech.argNotFound);
    }

    else if (pkmn2)
      return message.channel.send( calc.bestBallsMsg(pkmn2, false, catchEmbed) );

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  
}