const fs = require("fs");
const botspeech = require("./botspeech.js");

let data = fs.readFileSync("./data/pokemon.json");
let pokeSON = JSON.parse(data);

var pokemon = pokeSON;

data = fs.readFileSync("./data/denpokemon.json");
let denpokemon = JSON.parse(data);

data = fs.readFileSync("./data/balls.json");
var balls = JSON.parse(data);

/*
var ingamePkmn = pokemon.filter(x => {
  return denpokemon.includes(x.name);
});
*/

/*
pokemon.forEach(pkmn => {
  let formIndex = pkmn.name.indexOf("-");

  if (formIndex != -1 && !botspeech.dashPkmn.includes(pkmn.name))
    pkmn.name = pkmn.name.slice(0, formIndex+2);
});
*/

var ballNames = new Array();

balls.forEach(ball => {
  let ballNameLength = ball.name.length;
  let ballNameFull = ball.name.replace(" ", "").toLowerCase();
  let ballNameAbbr = ball.name.substring(0, (ballNameLength - "Ball".length-1)).toLowerCase();

  ballNames.push(ball.name);
  ballNames.push(ballNameFull);
  ballNames.push(ballNameAbbr);
});

exports.pokemon = pokemon;
exports.balls = balls;
exports.ballNames = ballNames;
