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

const denPokemon = pokemon.filter(x => {
  return pokelists.denPokemon.includes(x.name);
});

let formsStr = "";
pokelists.forms.forEach(form => (formsStr += "\\b" + form + "\\b\|"));

const formsEx = new RegExp(formsStr, "gi");
const starEx = new RegExp(/\*/, "gi");

// Pokè-Data Fetch function for the bot. Utilizes Regex to break down passed
// arguments and then search for and return a Pokèmon Obj, Den Obj, or Ball Obj.
// Regexs are marked with an Ex at the end of their var names.
exports.fetch = (flag, args, settings) => {

  if (flag == "pkmn")
  {
    // Retrieves the Pkmn Name from the list of passed arguments.
    let pkmnarg = args.join(" ")
      .replace(formsEx, "")
      .replace(/[\W]/gi, "");

    //console.log(pkmnarg);
    if (pkmnarg == "") return null;

    let pokemonlist = settings.denpkmnonly? denPokemon : pokemon;
    let shiny = starEx.test(args.join()) || settings.shinypkmnonly;

    let pkmnEx = new RegExp(pkmnarg, "gi");
    //console.log(pkmnEx);

    let pkmn = pokemonlist.find(pkmn => (pkmnEx.test(pkmn.name.replace(/[\W]/gi, ""))));
    //console.log(pkmn);

    if (!pkmn) return null;

    else if (args.length == 1)
      return {pkmn: pkmn, form: null, cosmetic: false, shiny: shiny};

    else
    {
      let noncosStr = "";
      let cosStr = "";
      let forms = args.join(" ").match(formsEx).filter(match => (match != ''));
      
      if (forms.length == 0)
        return {pkmn: pkmn, form: null, cosmetic: false, shiny: shiny};
      //console.log(forms)

      forms.forEach(form => {
        form = form.replace(/galar\b/gi, "Galarian");
        form = form.replace(/alola\b/gi, "Alolan");
        form = form.replace(/gmax\b/gi, "Gigantamax");
        noncosStr += `${pkmn.name} (?=${form})|(?<=${form}) ${pkmn.name}|`;
        cosStr += `\\b${form}\\b|`;
      });

      let cosEx = new RegExp(cosStr.substring(0, cosStr.lastIndexOf("|")), "gi");
      //console.log(cosEx);

      let form = pkmn.forms.find(form => (cosEx.test(form)));
      //console.log(form);

      if (!form)
        return {pkmn: pkmn, form: null, cosmetic: false, shiny: shiny}

      let noncosEx = new RegExp(noncosStr.substring(0, noncosStr.lastIndexOf("|")), "gi");
      //console.log(noncosEx);

      let pkmnform = pokemonlist.find(pkmn => (noncosEx.test(pkmn.name)));
      //console.log(pkmnform);

      if (pkmnform)
        return {pkmn: pkmnform, form: form, cosmetic: false, shiny: shiny};

      return {pkmn: pkmn, form: form, cosmetic: true, shiny: shiny};
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