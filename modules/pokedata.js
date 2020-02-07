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


exports.fetch = (flag, args, settings) => {

  let star = new RegExp(/\*/, "gi");

  if (flag == "pkmn")
  {
    let pokemonlist = settings.denpkmnonly? denPokemon : pokemon;
    let shiny = settings.shinypkmnonly;
    let form = null;
    let pkmn = null;

    args.forEach(term => {
      shiny = shiny || star.test(term);
      term = term.replace(/[^A-Za-z0-9']/gi, "");
      term = term.replace(/galar\b/gi, "Galarian");
      term = term.replace(/alola\b/gi, "Alolan");
      term = term.replace(/gmax/gi, "Gigantamax");
      let regex = new RegExp("\\b" + term + "\\b", "gi");
      console.log(regex);

      let maybeform = pokelists.forms.find(form => (regex.test(form)));
      form = form || maybeform;
      console.log(form);
      if (maybeform) return;

      let maybepkmn = pokemonlist.find(pkmn => (regex.test(pkmn.name)));
      pkmn = pkmn || maybepkmn;
      console.log(pkmn);
    });

    if (!pkmn)
      return null;

    else
    {
      if (!form)
        return {pkmn: pkmn, form: form, cosmetic: false, shiny: shiny};

      else
      {
        if (!pkmn.forms.includes(form))
          return null;

        else if (!pokelists.noncosmeticforms.includes(form))
          return {pkmn: pkmn, form: form, cosmetic: true, shiny: shiny};

        let formreg = new RegExp(pkmn.name + "(?= " + form + ")\|" + "(?<=" + form + " )" + pkmn.name, "gi");
        console.log(formreg);

        let formpkmn = pokemonlist.find(pkmn => (formreg.test(pkmn.name)));
        if (!formpkmn)
          return null;

        else
          return {pkmn: formpkmn, form: form, cosmetic: false, shiny: shiny};
      }
    }
  }

  else if (flag == "ball")
  {
    let ballreg = new RegExp(args, "gi");
    return balls.find(ball => (ballreg.test(ball.name)))
  }

  else if (flag == "den")
  {
    let denreg = new RegExp(args, "gi");
    return dens.find(den => (denreg.test(den.den)))
  }
}

exports.balls = balls;
exports.dens = dens;