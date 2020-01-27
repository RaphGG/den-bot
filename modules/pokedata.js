const fs = require("fs");
const pokelists = require("../data/lists.js");
// TODO: Finish Comments
// TODO: Guild-Specific Configs?

let data = fs.readFileSync("./data/pokemon.json");
pokemon = JSON.parse(data);

var denPokemon = pokemon.filter(x => {
  return pokelists.denPokemon.includes(x.name);
});

var nonAlpha = new RegExp(/[^A-Za-z0-9]/, 'g');
let reg = "";
pokelists.cosmeticForms.forEach(form => {
  reg = reg + form.replace(/ /g, '') + '|';
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

  if (flag == "pkmn")
  {
    let pkmn = pokemon.find(x => {
      let nameMatch = x.name.replace(nonAlpha, "").toLowerCase() == name;
      let formMatch = cform? x.forms.some(form => {return form.replace(/ /g, '').toLowerCase() == cform}) : true;
      return nameMatch && formMatch;
    });
    return {
      pkmn: pkmn,
      cform: cform
    }
  }

  else if (flag == "ball")
  {
    return balls.find(x => {
      return x.name.replace(nonAlpha, "").toLowerCase().startsWith(name);
    });
  }

  else
    return null;
}

exports.balls = balls;
exports.nonAlpha = nonAlpha;
exports.cosmeticForms = cosmeticForms;
exports.denPkmn = denPokemon;
/*
let y = this.fetch("pkmn", ["morpeko-hangry-mode"]);
console.log(y);
*/