const fs = require("fs");
const botspeech = require("./botspeech.js");

let data = fs.readFileSync("./data/pokemon.json");
let pokeSON = JSON.parse(data);

var pokemon = pokeSON;

/*
data = fs.readFileSync("./data/denpokemon.json");
let denpokemon = JSON.parse(data);

data = fs.readFileSync("./data/balls.json");
var balls = JSON.parse(data);


var ingamePkmn = pokemon.filter(x => {
  return denpokemon.includes(x.name);
});

pokemon.forEach(pkmn => {
  let formIndex = pkmn.name.indexOf("-");

  if (formIndex != -1 && !botspeech.dashPkmn.includes(pkmn.name))
    pkmn.name = pkmn.name.slice(0, formIndex+2);
});


var ballNames = new Array();

balls.forEach(ball => {
  let ballNameLength = ball.name.length;
  let ballNameFull = ball.name.replace(" ", "").toLowerCase();
  let ballNameAbbr = ball.name.substring(0, (ballNameLength - "Ball".length-1)).toLowerCase();

  ballNames.push(ball.name);
  ballNames.push(ballNameFull);
  ballNames.push(ballNameAbbr);
});
let test = "type: null.";
let test2 = "Mr. Mime.";
let test3 = "Necrozma-Dawn-Wings";

let print = test.replace(/[^A-Za-z0-9_-]/g, "");
console.log(print);
let print2 = test2.replace(/[^A-Za-z0-9_-]/g, "");
console.log(print2);
let print3 = test3.replace(/[^A-Za-z0-9_-]/g, "");
console.log(print3);
*/

exports.fetch = (flag, args) => {
  if (flag == "pkmn")
  {
    let pkmnName = "";
    if (args.length >= 1)
      args = args.join("");

    pkmnName = args.replace(/[^A-Za-z0-9_-]/g, "").toLowerCase();
    let pkmnObj = pokemon.find(x => {
      let pname = x.name.replace(/[^A-Za-z0-9_-]/g, "").toLowerCase();
      return pname == pkmnName;
    });

    return pkmnObj
  }

  /*
  else if (flag == "ball");
  {
    let ballName = "";
    if (args.length)
  }
  */
}

let mon = this.fetch("pkmn", ["Type", "Null"]);
console.log(mon);
