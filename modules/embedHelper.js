const Discord = require("discord.js");
const botspeech = require("./botspeech.js");
// TODO: Finish Comments.

// Edge colors for Discord rich embed message. They correspond
// to their respective type colors.
const pkmnEmbedColors = [
  {
    "type":"Normal",
    "color":10922870
  },
  {
    "type":"Fire",
    "color":16724480
  },
  {
    "type":"Water",
    "color":6916083
  },
  {
    "type":"Grass",
    "color":4772433
  },
  {
    "type":"Electric",
    "color":16569344
  },
  {
    "type":"Psychic",
    "color":16724352
  },
  {
    "type":"Ice",
    "color":8641754
  },
  {
    "type":"Dragon",
    "color":8913147
  },
  {
    "type":"Dark",
    "color":7624774
  },
  {
    "type":"Fairy",
    "color":16724178
  },
  {
    "type":"Fighting",
    "color":10297114
  },
  {
    "type":"Flying",
    "color":11830002
  },
  {
    "type":"Poison",
    "color":11670944
  },
  {
    "type":"Ground",
    "color":14992224
  },
  {
    "type":"Rock",
    "color":12231723
  },
  {
    "type":"Bug",
    "color":10403595
  },
  {
    "type":"Ghost",
    "color":7949977
  },
  {
    "type":"Steel",
    "color":12236497
  }
]

// Footer credit for each embed the bot makes.
const footerCred = "Alcremie-B - by Droopy";

// Color finder using json pkmn's type.
const colorFinder = (pkmn) => {
  let color = pkmnEmbedColors.find(x => {
    return x.type == pkmn.type1;
  });
  if (!color)
    return 12236497;

  else
    return color.color;
}

// Image finder using the shiny & cosmetic form properties of the
// pkmnObj. Utilizes pkparaiso's & project pokemon's sprites at
// the moment. Subject to change [TODO].
const imageFinder = (pkmnObj) => {
  let name = pkmnObj.pkmn.name.replace(/[^A-Za-z0-9- ]/g, "").toLowerCase();
  name = name.replace(/ /gi, "-");
  console.log(name);

  if (!pkmnObj.cosmetic && !pkmnObj.shiny)
  {
    return `https://raphgg.github.io/den-bot/data/sprites/pokemon/normal/${name}.gif`;
  }

  else if (pkmnObj.cosmetic && !pkmnObj.shiny)
  {
    name = name + '-' + pkmnObj.form.replace(/ /gi, "-").toLowerCase();
    console.log(name);
    return `https://raphgg.github.io/den-bot/data/sprites/pokemon/normal/${name}.gif`;
  }

  else if (!pkmnObj.cosmetic && pkmnObj.shiny)
  {
    return `https://raphgg.github.io/den-bot/data/sprites/pokemon/shiny/${name}.gif`;
  }

  else
  {
    name = name + '-' + pkmnObj.form.replace(/ /gi, "-").toLowerCase();
    return `https://raphgg.github.io/den-bot/data/sprites/pokemon/shiny/${name}.gif`;
  }
}

// Exported polymorphic embed creator method. Uses flag to discern
// what message to create. Args may be [pkmnObj], [pkmnObj, bestBalls].
// TODO: Finish this method.
exports.createEmbed = (flag, client, args) => {
  let embed = new Discord.RichEmbed();
  embed.setFooter(footerCred, client.user.avatarURL);

  if (flag == "top4")
  {
    let pkmnObj = args[0];
    console.log(pkmnObj);
    let bestBalls = args[1];
    let gmax = pkmnObj.form == "Gigantamax";
    let description = gmax? `The best balls for catching G-Max ${pkmnObj.pkmn.name} are:` : `The best balls for catching ${pkmnObj.pkmn.name} are:`;

    embed.setImage(imageFinder(pkmnObj));
    embed.setColor(colorFinder(pkmnObj.pkmn));
  
    embed.setTitle("Best Catch Rates");
    embed.setDescription(description);

    let ballPercents = "";
    let promoPercents = "";
    let standardPercents = `\nStandard Balls (Poke/Luxury/Premier): \`${pkmnObj.pbCatchProb}\``;

    bestBalls.forEach((ball, i) => {
      ballPercents = ballPercents + `\n${ball.name}: ${pkmnObj.catchProb[i]}`;
      if (pkmnObj.promo)
        promoPercents = promoPercents + `\n${ball.name}: ${pkmnObj.promoCatchProb[i]}`;
    });

    embed.addField("Top 4:", ballPercents, true);
    if (pkmnObj.promo)
      embed.addField("Promo Top 4:", promoPercents, true);

    embed.addField("Standard:", standardPercents, true);

    return embed;
  }
  
  else if (flag == "ball")
  {
    let pkmnObj = args[0];
    console.log(pkmnObj);
    let ball = args[1];
    let gmax = (pkmnObj.form == "Gigantamax")? "G-Max" : ""; 
    let promo = pkmnObj.promo? `\nPromo Probability is: ${pkmnObj.promoCatchProb}` : "";
    embed.setTitle(`Probability of catching ${gmax} ${pkmnObj.pkmn.name} with a ${ball.name} is: ${pkmnObj.catchProb}`);

    let emoji = "";

    if (ball.assumption == null)
      emoji = "❓";

    else
      emoji = ball.assumption? "✅" : "⛔";

    embed.setDescription(`Ball condition met: ${emoji}` + `${promo}`);
    embed.setThumbnail(imageFinder(pkmnObj));
    embed.setColor(colorFinder(pkmnObj.pkmn));

    return embed;
  }

  else if (flag == "dex")
  {
    console.log(args)
    let pkmn = args.pkmn;
    
    // Edge Color & Image
    embed.setColor(colorFinder(pkmn));
    embed.setImage(imageFinder(args));

    // Types (Title)
    let type1 = client.emojis.find(x => {
      return x.name == pkmn.type1;
    });

    let type2 = client.emojis.find(x => {
      return x.name == pkmn.type2;
    });

    let types = type2? type1 + " " + type2 : type1;

    // Title
    let title = `**__#${pkmn.dexId} • ${pkmn.name} __**` + types;
    embed.setTitle(title);

    // Misc. Info
    let genderRatio = `Gender Ratio: \`${pkmn.genderRatio}\``;
    let heightWeight = `Height/Weight: \`${pkmn.height}m\` / \`${pkmn.weight}kg\``;
    //let weight = `Weight: \`${pkmn.weight}kg\``;
    let catchRate = `Catch Rate: \`${pkmn.catchRate}\``;
    let gen = `Generation: \`${pkmn.generation}\``;
    let egg = `Egg Groups: \`${pkmn.eggGroup1}`;
    if (pkmn.eggGroup2)
      egg = egg + `, ${pkmn.eggGroup2}\``;

    else
      egg = egg + `\``;

    let miscInfo = genderRatio + "\n" + heightWeight + "\n" + catchRate + "\n" + gen + "\n" + egg;
    if (pkmn.forms.length > 0)
    {
      
      let forms = "\`";
      pkmn.forms.forEach(form => {
        forms = forms + form + ', ';
      });
      forms = forms.slice(0, forms.lastIndexOf(', ')) + '\`';
    
      //embed.addField("Forms", forms, true);
      miscInfo = miscInfo + "\nForms: " + forms;
    }

    embed.addField("Misc. Info", miscInfo, true);

    // Base Stats
    let statHeader1 = `__\`HP     Atk     Def\`__`;
    let statHeader2 = `__\`SpA    SpD     Spe\`__`;

    let baseStats1 = `\`${pkmn.baseStats.hp.toString().padEnd(7, " ")}${pkmn.baseStats.atk.toString().padEnd(8, " ")}${pkmn.baseStats.def.toString().padEnd(3, " ")}\``;

    let baseStats2 = `\`${pkmn.baseStats.spA.toString().padEnd(7, " ")}${pkmn.baseStats.spD.toString().padEnd(8, " ")}${pkmn.baseStats.spe.toString().padEnd(3, " ")}\``;


    let baseStatTotal = `__\`Total: ${pkmn.baseStats.tot}\`__`;

    let baseStats = statHeader1 + "\n" + baseStats1 + "\n" + statHeader2 + "\n" + baseStats2 + "\n" + baseStatTotal;
    embed.addField("Base Stats", baseStats, true);


    // Abilities
    let ab2 = pkmn.abilities.ability2? `\nAbility 2: \`${pkmn.abilities.ability2}\`` : "";

    let abH = pkmn.abilities.abilityH? `\nHidden Ability: \`${pkmn.abilities.abilityH}\`` : "";

    let abilities = `Ability 1: \`${pkmn.abilities.ability1}\`` + ab2 + abH;

    embed.addField("Abilities", abilities, true);

    // Dens
    let dens = "";
    if (pkmn.dens.sword.length > 0)
    {
      let swordDens = "Sword: \`";
      pkmn.dens.sword.forEach(den => {
        swordDens = swordDens + den + ', ';
      });
      swordDens = swordDens.slice(0, swordDens.lastIndexOf(', ')) + '\`';
    
      dens = dens + swordDens;
    }

    if (pkmn.dens.shield.length > 0)
    {
      let shieldDens = "\nShield: \`";
      pkmn.dens.shield.forEach(den => {
        shieldDens = shieldDens + den + ', ';
      });
      shieldDens = shieldDens.slice(0, shieldDens.lastIndexOf(', ')) + '\`';
      dens = dens + shieldDens;
    }

    if (dens != "")
      embed.addField("Dens", dens, false);


    return embed;
  }

  else if (flag == "den")
  {
    let color = args.den >= 43 ? 12390624 : 10231623;
    embed.setColor(color);
    embed.setImage(`https://raphgg.github.io/den-bot/data/dens/den${args.den}.png`);

    embed.setTitle(`Den ${args.den}:`);
    embed.setURL(`https://www.serebii.net/swordshield/maxraidbattles/den${args.den}.shtml`)
    let swordHa = args.sword.filter(pkmn => {
      return pkmn.ability.startsWith("Hidden");
    })
    .map(pkmn => {return pkmn.name})
    .join("\n");

    let shieldHa = args.shield.filter(pkmn => {
        return pkmn.ability.startsWith("Hidden");
      })
      .map(pkmn => {return pkmn.name})
      .join("\n");

    embed.addField("Sword HA:", swordHa, true);
    embed.addField("Shield HA:", shieldHa, true);

    return embed;
  }

  else if (flag == "denPkmn")
  {
    let pkmnObj = args[0];
    let pkmn = pkmnObj.pkmn;
    let denArr = args[1];
    let shieldArr = denArr
      .filter(den => (pkmn.dens.shield.includes(den.den)))
      .filter(den => (den.shield.some(mon => (mon.name == pkmn.name && mon.ability.startsWith("Hidden")))))
      .map(den => (den.den));

    let swordArr = denArr
      .filter(den => (pkmn.dens.sword.includes(den.den)))
      .filter(den => (den.sword.some(mon => (mon.name == pkmn.name && mon.ability.startsWith("Hidden")))))
      .map(den => (den.den));

    embed.setColor(colorFinder(pkmn));
    embed.setThumbnail(imageFinder(pkmnObj));

    embed.setTitle(`${pkmn.name} is in the following dens: `);

    let dens = "";
    if (pkmn.dens.sword.length > 0)
    {
      let swordDens = "**Sword:** ";
      let nonHa = pkmn.dens.sword.filter(den => (!swordArr.includes(den)));
      nonHa.forEach(den => {
        swordDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });

      if (swordArr.length > 0)
        swordDens += 'HA: ';

      swordArr.forEach(den => {
        swordDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });
      swordDens = swordDens.slice(0, swordDens.lastIndexOf(', '));
      dens += swordDens + '\n';
    }

    if (pkmn.dens.shield.length > 0)
    {
      let shieldDens = "**Shield:** ";
      let nonHa = pkmn.dens.shield.filter(den => (!shieldArr.includes(den)));
      nonHa.forEach(den => {
        shieldDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });

      if (shieldArr.length > 0)
        shieldDens += 'HA: ';

      shieldArr.forEach(den => {
        shieldDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });

      shieldDens = shieldDens.slice(0, shieldDens.lastIndexOf(', '));
      dens += shieldDens + '\n';
    }

    embed.setDescription(dens);

    return embed;
  }

  else if (flag == "balls")
  {
    
  }

  else if (flag == "credits")
  {
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTimestamp();
  }

  else if (flag == "help")
  {
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTimestamp();
    embed.setTitle("All Bot Commands:");
    embed.setDescription(botspeech.commandDescription);
    embed.addField("Pokémon Commands:", botspeech.pokeCommands.replace(/{{prefix}}/g, args[1]));

    if (args[0])
      embed.addField("User Commands:", botspeech.adminCommands.replace(/{{prefix}}/g, args[1]));

    else 
      embed.addField("User Commands:", botspeech.nonAdminCommands.replace(/{{prefix}}/g, args[1]));

    return embed;
  }
}