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
pokelists.forms.forEach(form => (formsStr += "\\b" + form + "\\b|"));

/*
let ballStr = "";
pokelists.ballNames.forEach(ball => (ballStr += "\\b" + ball.replace(/ ball/gi, "") + "\\b"));
*/
const formsEx = new RegExp(formsStr, "gi");
// const ballsEx = new RegExp(ballStr, "gi");
const starEx = new RegExp(/\*/, "gi");

// Poké-Data Fetch function for the bot. Utilizes Regex to break down passed
// arguments and then search for and return a Pokémon Obj, Den Obj, or Ball Obj.
// Regexs are marked with an Ex at the end of their var names.
exports.fetch = (flag, args, settings) => {

  if (flag == "pkmn")
  {
    // Retrieves the Pkmn Name from the list of passed arguments.
    const pkmnarg = args.join(" ")
      .replace(formsEx, "")
      .replace(/[\W]/gi, "");

    // console.log(pkmnarg);
    if (pkmnarg == "") return null;

    const pokemonlist = settings.denpkmnonly == "true"? denPokemon : pokemon;
    const shiny = starEx.test(args.join()) || settings.shinypkmnonly == "true";

    const pkmnEx = new RegExp(pkmnarg, "gi");
    // console.log(pkmnEx);

    const pkmn = pokemonlist.find(pkmn => (pkmnEx.test(pkmn.name.replace(/[\W]/gi, ""))));
    // console.log(pkmn);

    if (!pkmn) return null;

    else if (args.length == 1)
      return { pkmn: pkmn, form: null, cosmetic: false, shiny: shiny };

    else
    {
      let noncosStr = "";
      let cosStr = "";
      const forms = args.join(" ").match(formsEx).filter(match => (match != ''));

      if (forms.length == 0)
        return { pkmn: pkmn, form: null, cosmetic: false, shiny: shiny };
      // console.log(forms)

      forms.forEach(form => {
        form = form.replace(/galar\b/gi, "Galarian");
        form = form.replace(/alola\b/gi, "Alolan");
        form = form.replace(/gmax\b/gi, "Gigantamax");
        noncosStr += `${pkmn.name} (?=${form})|(?<=${form}) ${pkmn.name}|`;
        cosStr += `\\b${form}\\b|`;
      });

      const cosEx = new RegExp(cosStr.substring(0, cosStr.lastIndexOf("|")), "gi");
      // console.log(cosEx);

      const form = pkmn.forms.find(form => (cosEx.test(form)));
      // console.log(form);

      if (!form)
        return { pkmn: pkmn, form: null, cosmetic: false, shiny: shiny }

      const noncosEx = new RegExp(noncosStr.substring(0, noncosStr.lastIndexOf("|")), "gi");
      // console.log(noncosEx);

      const pkmnform = pokemonlist.find(pkmn => (noncosEx.test(pkmn.name)));
      // console.log(pkmnform);

      if (pkmnform)
        return { pkmn: pkmnform, form: form, cosmetic: false, shiny: shiny };

      return { pkmn: pkmn, form: form, cosmetic: true, shiny: shiny };
    }
  }

  else if (flag == "ball")
  {
    const str = args.join("").replace(/[\W]/g, "").replace(/ball/gi, "");
    if (str.length == 0) return null;
    // console.log(str);
    const ballreg = new RegExp(str, "gi");
    return balls.find(ball => (ballreg.test(ball.name)));
  }

  else if (flag == "den")
  {
    const str = args.join("").replace(/[\W]/g, "");
    if (str.length == 0) return null;
    // console.log(str);
    const denreg = new RegExp(str, "gi");
    return dens.find(den => (denreg.test(den.den)));
  }

  else if (flag == "types")
  {
    const str = args
      .join(" ")
      .replace(/[^A-Za-z0-9 ]/gi, "")
      .toLowerCase()
      .split(" ");

    const type1 = pokelists.types.find(type => (type.name.toLowerCase() == str[0]));
    // console.log(`type1: \n${type1}`);

    if (!type1) return null;

    else if (args.length < 2) return [type1];

    else
    {
      const type2 = pokelists.types.find(type => (type.name.toLowerCase() == str[1]));
      // console.log(`type2: \n${type2}`);

      if (!type2) return [type1];

      else return [type1, type2];
    }
  }
};

exports.balls = balls;
exports.dens = dens;