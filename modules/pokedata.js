const fs = require("fs");
const pokeLists = require("../data/lists.js");

let data = fs.readFileSync("./data/pokemon.json");
let pokeSON = JSON.parse(data);

var pokemon = pokeSON;

var denPokemon = pokemon.filter(x => {
  return pokeLists.denPokemon.includes(x.name);
});

var nonAlpha = new RegExp(/[^A-Za-z0-9]/, 'g');
let reg = "";
pokeLists.cosmeticForms.forEach(form => {
  reg = reg + form + '|';
});

var cosmeticForms = new RegExp(reg, 'gi');

data = fs.readFileSync("./data/balls.json");
const balls = JSON.parse(data);

exports.fetch = (flag, args) => {
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

  switch (flag)
  {
    case "pkmn":
      return pokemon.find(x => {
        let nameMatch = x.name.replace(nonAlpha, "").toLowerCase() == name;
        let formMatch = cform? x.forms.some(form => {return form.toLowerCase() == cform}) : true;
        return nameMatch && formMatch;
      });

    case "ball":
      return balls.find(x => {
        return x.name.replace(nonAlpha, "").toLowerCase().startsWith(name);
      });

    default:
      return null;
  }
}

exports.balls = balls;
exports.nonAlpha = nonAlpha;
exports.cosmeticForms = cosmeticForms;