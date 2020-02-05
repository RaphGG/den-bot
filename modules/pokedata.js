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

  if (flag == "pkmn")
  {
    let pokemonlist = settings.denpkmnonly? denPokemon : pokemon;
    let fullname = "";
    let test = "";
    args.forEach(term => {
      fullname += "\\b" + term + "\\b\|";
      test += "^" + term + "\|";
    });

  
    let pkmnreg = new RegExp(fullname.substring(0, fullname.lastIndexOf("\|")), "gi");

    let testreg = new RegExp(test.substring(0, test.lastIndexOf("\|")), "gi");

    console.log("pkmnreg: " + new RegExp(pkmnreg));
    console.log("testreg: " + new RegExp(testreg));
  
    let form = pokelists.forms.find(form => (pkmnreg.test(form)));
    console.log("form: " + form);

    if (!form)
    {
      let pkmn = pokemonlist.find(mon => (pkmnreg.test(mon.name)));
      if (!pkmn)
        return null;

      else
        return pkmn
    }

    else if (pokelists.noncosmeticforms.includes(form))
    {
      
      let tempmon = pokemonlist.filter(mon => (testreg.test(mon.name)))
      if (!tempmon || tempmon.length <= 1)
        return null;

      let formreg = new RegExp(tempmon[0].name + "(?= " + form + ")", "gi");
      console.log(formreg);
      console.log(tempmon);

      let pkmn = tempmon.find(mon => (formreg.test(mon.name)));

      if (!pkmn)
        return null;


      return pkmn;
    }

    else
    {
      let pkmn = pokemonlist.find(mon => (pkmnreg.test(mon.name) && mon.forms.includes(form)));

      if (!pkmn)
        return null

      else
        return pkmn;
    }
  }

  /*
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

    */
    //let shiny = settings.shinypkmnonly? true : args.match(/\*/g);
    /*
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
    */
}
let settings = {
  denpkmnonly: false
}
let args = "          Blastoise Mega      ".trim().split(/ |-/g);
console.log(args);
console.log(this.fetch("pkmn", args, settings));