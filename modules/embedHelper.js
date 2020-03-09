const { MessageEmbed } = require("discord.js");
const botspeech = require("./botspeech.js");
const pokelists = require("../data/lists.js");
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
];

// Footer credit for each embed the bot makes.
const footerCred = "Alcremie-B - by Droopy";

let formsStr = "";
pokelists.noncosmeticforms.forEach(form => (formsStr += " " + form + "|" + form + " |"));

const formsEx = new RegExp(formsStr, "gi");

const edgecases = ["Mr Mime", "Mr Rime", "Galarian Mr Mime"];

// Color finder using json pkmn's type.
const colorFinder = (pkmn) => {
  const color = pkmnEmbedColors.find(x => {
    return x.type == pkmn.type1;
  });
  if (!color)
    return 12236497;

  else
    return color.color;
};

// Image finder using the shiny & cosmetic form properties of the
// pkmnObj. Utilizes pkparaiso's & project pokemon's sprites at
// the moment. Subject to change [TODO].
const imageFinder = (pkmnObj) => {
  let name = pkmnObj.pkmn.name.replace(/[^A-Za-z0-9 ]/gi, "").replace(/ /gi, "-").toLowerCase();
  // console.log(name);

  if (!pkmnObj.cosmetic && !pkmnObj.shiny)
  {
    return `https://raphgg.github.io/den-bot/data/sprites/pokemon/normal/${name}.gif`;
  }

  else if (pkmnObj.cosmetic && !pkmnObj.shiny)
  {
    name = name + '-' + pkmnObj.form.replace(/ /gi, "-").toLowerCase();
    // console.log(name);
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
};

// Exported polymorphic embed creator method. Uses flag to discern
// what message to create. Args may be [pkmnObj], [pkmnObj, bestBalls].
// TODO: Finish this method.
exports.createEmbed = (flag, client, args) => {
  const embed = new MessageEmbed();
  embed.setFooter(footerCred, client.user.avatarURL);

  if (flag == "top4")
  {
    const pkmnObj = args[0];
    // console.log(pkmnObj);
    const bestBalls = args[1];
    const gmax = pkmnObj.form == "Gigantamax";
    const description = gmax? `The best balls for catching G-Max ${pkmnObj.pkmn.name} are:` : `The best balls for catching ${pkmnObj.pkmn.name} are:`;

    embed.setImage(imageFinder(pkmnObj));
    embed.setColor(colorFinder(pkmnObj.pkmn));

    embed.setTitle("Best Catch Rates");
    embed.setDescription(description);

    let ballPercents = "";
    let promoPercents = "";
    const standardPercents = `\nStandard Balls (Poke/Luxury/Premier): \`${pkmnObj.pbCatchProb}\``;

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
    const pkmnObj = args[0];
    const ball = args[1];
    const gmax = (pkmnObj.form == "Gigantamax")? "G-Max" : "";
    const promo = pkmnObj.promo? `\nPromo Probability is: ${pkmnObj.promoCatchProb}` : "";
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
    // console.log(args)
    const pkmn = args.pkmn;

    // Edge Color & Image
    embed.setColor(colorFinder(pkmn));
    embed.setImage(imageFinder(args));

    // Types (Title)
    const type1 = client.emojis.cache.find(x => (x.name == `Type${pkmn.type1}`));

    const type2 = client.emojis.cache.find(x => (x.name == `Type${pkmn.type2}`));

    const types = type2? `${type1} ${type2}`: `${type1}`;

    // Title
    let pkmnNoForm = args.cosmetic? pkmn.name : pkmn.name.replace(formsEx, "");

    if (edgecases.includes(pkmn.name))
      pkmnNoForm = pkmnNoForm.slice(0, 2) + "." + pkmnNoForm.slice(3);

    const dexId = `${pkmn.dexId}`.padStart(3, "0");
    const titleUrl = pkmn.generation == "SwordShield"? `https://serebii.net/pokedex-swsh/${pkmnNoForm.toLowerCase()}/` : `https://serebii.net/pokedex-sm/${dexId}.shtml`;

    embed.setURL(titleUrl);

    const title = `**__#${pkmn.dexId} • ${pkmn.name} __**` + types;
    embed.setTitle(title);

    // Misc. Info
    const genderRatio = `Gender Ratio: \`${pkmn.genderRatio}\``;
    const heightWeight = `Height/Weight: \`${pkmn.height}m\` / \`${pkmn.weight}kg\``;
    // let weight = `Weight: \`${pkmn.weight}kg\``;
    const catchRate = `Catch Rate: \`${pkmn.catchRate}\``;
    const gen = `Generation: \`${pkmn.generation}\``;
    let egg = `Egg Groups: \`${pkmn.eggGroup1}`;
    if (pkmn.eggGroup2)
      egg = egg + `, ${pkmn.eggGroup2}\``;

    else
      egg = egg + `\``;

    let miscInfo = genderRatio + "\n" + heightWeight + "\n" + catchRate + "\n" + gen + "\n" + egg;
    if (pkmn.forms.length > 0)
    {

      let forms = "`";
      const formlist = pokelists.variousForms.get(pkmn.name) || pkmn.forms;
      formlist.forEach(form => {
        forms = forms + form + ', ';
      });
      forms = forms.slice(0, forms.lastIndexOf(', ')) + '`';

      // embed.addField("Forms", forms, true);
      miscInfo = miscInfo + "\nForms: " + forms;
    }

    embed.addField("Misc. Info", miscInfo, true);

    // Base Stats
    const statHeader1 = `__\`HP     Atk     Def\`__`;
    const statHeader2 = `__\`SpA    SpD     Spe\`__`;

    const baseStats1 = `\`${pkmn.baseStats.hp.toString().padEnd(7, " ")}${pkmn.baseStats.atk.toString().padEnd(8, " ")}${pkmn.baseStats.def.toString().padEnd(3, " ")}\``;

    const baseStats2 = `\`${pkmn.baseStats.spA.toString().padEnd(7, " ")}${pkmn.baseStats.spD.toString().padEnd(8, " ")}${pkmn.baseStats.spe.toString().padEnd(3, " ")}\``;


    const baseStatTotal = `__\`Total: ${pkmn.baseStats.tot}\`__`;

    const baseStats = statHeader1 + "\n" + baseStats1 + "\n" + statHeader2 + "\n" + baseStats2 + "\n" + baseStatTotal;
    embed.addField("Base Stats", baseStats, true);


    // Abilities
    const ab2 = pkmn.abilities.ability2? `\nAbility 2: \`${pkmn.abilities.ability2}\`` : "";

    const abH = pkmn.abilities.abilityH? `\nHidden Ability: \`${pkmn.abilities.abilityH}\`` : "";

    const abilities = `Ability 1: \`${pkmn.abilities.ability1}\`` + ab2 + abH;

    embed.addField("Abilities", abilities, true);

    // Dens
    let dens = "";
    if (pkmn.dens.sword.length > 0)
    {
      let swordDens = "Sword: `";
      pkmn.dens.sword.forEach(den => {
        swordDens = swordDens + den + ', ';
      });
      swordDens = swordDens.slice(0, swordDens.lastIndexOf(', ')) + '`';

      dens = dens + swordDens;
    }

    if (pkmn.dens.shield.length > 0)
    {
      let shieldDens = "\nShield: `";
      pkmn.dens.shield.forEach(den => {
        shieldDens = shieldDens + den + ', ';
      });
      shieldDens = shieldDens.slice(0, shieldDens.lastIndexOf(', ')) + '`';
      dens = dens + shieldDens;
    }

    if (dens != "")
      embed.addField("Dens", dens, false);


    return embed;
  }

  else if (flag == "den")
  {
    const color = args.den >= 43 ? 12390624 : 10231623;
    embed.setColor(color);
    embed.setImage(`https://raphgg.github.io/den-bot/data/dens/den${args.den}.png`);

    embed.setTitle(`Den ${args.den}:`);
    embed.setURL(`https://www.serebii.net/swordshield/maxraidbattles/den${args.den}.shtml`);
    const swordHa = args.sword.filter(pkmn => {
      return pkmn.ability.startsWith("Hidden");
    })
    .map(pkmn => {return pkmn.name;})
    .join("\n");

    const shieldHa = args.shield.filter(pkmn => {
        return pkmn.ability.startsWith("Hidden");
      })
      .map(pkmn => {return pkmn.name;})
      .join("\n");

    if (swordHa.length > 1)
      embed.addField("Sword HA:", swordHa, true);

    if (shieldHa.length > 1)
      embed.addField("Shield HA:", shieldHa, true);

    return embed;
  }

  else if (flag == "denPkmn")
  {
    const pkmnObj = args[0];
    const pkmn = pkmnObj.pkmn;
    const denArr = args[1];

    const gmax = pkmnObj.form == "Gigantamax";
    const hidden = pkmn.abilities.abilityH;

    const shieldFltr = denArr.filter(den => (pkmn.dens.shield.includes(den.den)));
    const swordFltr = denArr.filter(den => (pkmn.dens.sword.includes(den.den)));

    embed.setColor(colorFinder(pkmn));
    embed.setThumbnail(imageFinder(pkmnObj));

    let shieldHa = [];
    let swordHa = [];

    let shieldArr = [];
    let swordArr = [];

    if (gmax)
    {
      shieldArr = shieldFltr
        .filter(den => (den.shield.some(mon => (mon.name == pkmn.name && mon.gigantamax))))
        .map(den => (den.den));

      swordArr = swordFltr
        .filter(den => (den.sword.some(mon => (mon.name == pkmn.name && mon.gigantamax))))
        .map(den => (den.den));

      embed.setTitle(`G-Max ${pkmn.name} is in the following dens:`);
    }

    else if (hidden)
    {
      shieldHa = shieldFltr
        .filter(den => (den.shield.some(mon => (mon.name == pkmn.name && mon.ability.startsWith("Hidden")))))
        .map(den => (den.den));

      swordHa = swordFltr
        .filter(den => (den.sword.some(mon => (mon.name == pkmn.name && mon.ability.startsWith("Hidden")))))
        .map(den => (den.den));

      shieldArr = pkmn.dens.shield.filter(den => (!shieldHa.includes(den)));
      swordArr = pkmn.dens.sword.filter(den => (!swordHa.includes(den)));
      embed.setTitle(`${pkmn.name} is in the following dens: `);
    }

    else
    {
      shieldArr = shieldFltr.map(den => (den.den));
      swordArr = swordFltr.map(den => (den.den));
      embed.setTitle(`${pkmn.name} is in the following dens: `);
    }

    let dens = "";
    if (pkmn.dens.sword.length > 0)
    {
      let swordDens = "**Sword:** ";
      if (gmax && hidden) swordDens += 'HA: ';

      swordArr.forEach(den => {
        swordDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });

      if (swordHa.length > 0)
      {
        swordDens += 'HA: ';

        swordHa.forEach(den => {
          swordDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
        });
      }

      swordDens = swordDens.slice(0, swordDens.lastIndexOf(', '));
      dens += swordDens + '\n';
    }

    if (pkmn.dens.shield.length > 0)
    {
      let shieldDens = "**Shield:** ";
      if (gmax && hidden) shieldDens += 'HA: ';

      shieldArr.forEach(den => {
        shieldDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
      });

      if (shieldHa.length > 0)
      {
        shieldDens += 'HA: ';

        shieldHa.forEach(den => {
          shieldDens += `[${den}](https://www.serebii.net/swordshield/maxraidbattles/den${den}.shtml)` + ', ';
        });
      }


      shieldDens = shieldDens.slice(0, shieldDens.lastIndexOf(', '));
      dens += shieldDens + '\n';
    }

    embed.setDescription(dens);

    return embed;
  }

  else if (flag == "ballinfo")
  {
    const ballurl = `https://serebii.net/itemdex/${args.name.replace(" ", "").toLowerCase()}.shtml`;

    embed.setURL(ballurl);
    embed.setTitle(`**__${args.name}__**`);

    const url = `https://raphgg.github.io/den-bot/data/sprites/balls/${args.name.replace(/ ball/gi, "").toLowerCase()}.png`;
    embed.setThumbnail(url);

    const aniUrl = `https://raphgg.github.io/den-bot/data/sprites/balls/${args.name.replace(/ ball/gi, "").toLowerCase()}.gif?cache=42069`;

    embed.setImage(aniUrl);

    const mod = args.varModifier || args.modifier;

    const desp = `**Ball Modifier:** \`${mod}x\`\n**Ball Conditions:** \`${args.conditions}\`\n**Ball Effects:** \`${args.effect}\``;
    embed.setDescription(desp);
    embed.setColor(args.color);
    return embed;
  }

  else if (flag == "natures")
  {
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTitle("Pokémon Natures Chart: (From Bulbapedia)");
    embed.setURL("https://bulbapedia.bulbagarden.net/wiki/Nature");
    embed.setImage("https://raphgg.github.io/den-bot/data/icons/natures.PNG");

    return embed;
  }

  else if (flag == "credits")
  {
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTimestamp();
    embed.setTitle("Credits:");
    embed.setThumbnail("https://raphgg.github.io/den-bot/data/readme/froslass-credits.gif");
    embed.setDescription(botspeech.creditsDescription);
    embed.addField("External Resources:", botspeech.creditsExternal);
    embed.addField("Sprite Work:", botspeech.creditsSprites);
    embed.addField("Others:", botspeech.creditsOthers);

    return embed;
  }

  else if (flag == "invite")
  {
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTimestamp();
    embed.setThumbnail("https://raphgg.github.io/den-bot/data/readme/alcremieinvite.gif");
    embed.setTitle("Alcremie-B Invite Link");
    embed.setDescription(botspeech.inviteDescription);

    return embed;
  }

  else if (flag == "help")
  {
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTimestamp();
    embed.setTitle("All Bot Commands:");
    embed.setURL(`https://raphgg.github.io/den-bot`);
    embed.setDescription(botspeech.commandDescription);
    embed.addField("Pokémon Commands:", botspeech.pokeCommands.replace(/{{prefix}}/g, args));

    embed.addField("User Commands:", botspeech.userCommands.replace(/{{prefix}}/g, args));

    embed.addField("Admin & Guild Commands:", botspeech.adminCommands.replace(/{{prefix}}/g, args));

    embed.addField("Support:", botspeech.helpSupport);

    return embed;
  }

  else if (flag == "helpcmd")
  {
    const cmd = args[0];
    const prefix = args[1];
    // embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setColor(14315906);
    embed.setTimestamp();
    embed.setTitle(`Help Page for ${cmd.name}`);
    embed.setURL(`https://raphgg.github.io/den-bot`);
    embed.setDescription(cmd.description);

    if (cmd.aliases && cmd.aliases.length > 0)
      embed.addField("Aliases:", cmd.aliases.join(", "), true);

    const cooldown = cmd.cooldown || 3;
    embed.addField("Cooldown:", `\`${cooldown}\` Second(s)`, true);
    embed.addField("Usage:", cmd.usage.replace(/{{prefix}}/gi, prefix), true);
    embed.addField("Examples:", cmd.example.replace(/{{prefix}}/gi, prefix), true);

    embed.addField("Guild/Admin Only:", `Guild Only: \`${cmd.guildOnly}\`\nAdmin Only: \`${cmd.adminOnly}\``, true);


    return embed;
  }
};