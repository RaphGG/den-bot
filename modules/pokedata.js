const fs = require("fs");
const pokelists = require("../data/lists.js");
// TODO: Finish Comments
// TODO: Guild-Specific Configs?

let data = fs.readFileSync("./data/pokemon.json");
const pokemon = JSON.parse(data);

data = fs.readFileSync("./data/balls.json");
const balls = JSON.parse(data);

data = fs.readFileSync("./data/dens.json");
const dens = JSON.parse(data);


var denPokemon = pokemon.filter(x => {
  return pokelists.denPokemon.includes(x.name);
});

var nonAlpha = new RegExp(/[^A-Za-z0-9]/, 'g');
let reg = "";
pokelists.cosmeticForms.forEach(form => {
  reg = reg + form.replace(/ /g, '') + '|';
});

var cosmeticForms = new RegExp(reg, 'gi');

exports.fetch = (flag, args, settings) => {

  let name = "";
  if (args.length >= 1)
    args = args.join("");

  name = args.replace(nonAlpha, "").toLowerCase();
  let cform = name.match(cosmeticForms).find(form => {return form != ''});

  if (cform)
  {
    name = name.replace(cosmeticForms, "");
    if (cform == "gmax")
      cform = "gigantamax";
  }

  if (flag == "pkmn")
  {
    let pokemonlist = settings.denpkmnonly? denPokemon : pokemon;
    let pkmn = pokemonlist.find(x => {
      let nameMatch = x.name.replace(nonAlpha, "").toLowerCase() == name;
      let formMatch = cform? x.forms.some(form => {return form.replace(/ /g, '').toLowerCase() == cform}) : true;
      return nameMatch && formMatch;
    });
    
    if (!pkmn)
      return null;

    let shiny = settings.shinypkmnonly? true : args.match(/\*/g);
    return {
      pkmn: pkmn,
      cform: cform,
      shiny: shiny
    }
  }

  else if (flag == "ball")
  {
    return balls.find(x => {
      return x.name.replace(nonAlpha, "").toLowerCase().startsWith(name);
    });
  }

  else if (flag == "den")
  {
    return dens.find(den => {
      return den.den == name;
    });
  }

  else
    return null;
}

exports.balls = balls;
exports.dens = dens;
exports.nonAlpha = nonAlpha;
exports.cosmeticForms = cosmeticForms;