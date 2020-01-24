const pokelists = require("../data/lists.js");
const pokedata = require("./pokedata.js");

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

exports.footerCred = "Alcremie-B - by Droopy";
exports.colorFinder = (pkmn) => {
  let color = pkmnEmbedColors.find(x => {
    return x.type == pkmn.type1;
  });
  if (!color)
    return 12236497;

  else
    return color.color;
}

exports.imageFinder = (pkmn, form, shiny) => {
  let name = pkmn.name.replace(/[^A-Za-z0-9-]/g, "").toLowerCase();

  if (!form && !shiny)
  {
    return pkmn.generation == "SwordShield"? `https://projectpokemon.org/images/normal-sprite/${name}.gif` : `https://play.pokemonshowdown.com/sprites/xyani/${name}.gif`;
  }

  else if (form && !shiny)
  {
    name = name + '-' + form;
    return pkmn.generation == "SwordShield"? `https://projectpokemon.org/images/normal-sprite/${name}.gif` : `https://play.pokemonshowdown.com/sprites/xyani/${name}.gif`;
  }

  else if (!form && shiny)
  {
    return pkmn.generation == "SwordShield"? `https://projectpokemon.org/images/shiny-sprite/${name}.gif` : `https://play.pokemonshowdown.com/sprites/ani-shiny/${name}.gif`;
  }

  else
  {
    name = name + '-' + form;
    return pkmn.generation == "SwordShield"? `https://projectpokemon.org/images/shiny-sprite/${name}.gif` : `https://play.pokemonshowdown.com/sprites/ani-shiny/${name}.gif`;
  }
}