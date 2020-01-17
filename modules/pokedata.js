const fs = require("fs");

let data = fs.readFileSync("./data/pokemon.json");
let pokeSON = JSON.parse(data);

var pokemon = pokeSON;

data = fs.readFileSync("./data/denpokemon.json");
let denpokemon = JSON.parse(data);

data = fs.readFileSync("./data/balls.json");
var balls = JSON.parse(data);

var ingamePkmn = pokemon.filter(x => {
  return denpokemon.includes(x.name);
});


ingamePkmn.forEach(pkmn => {
  let gf = "-Galar";
  let nameLength = pkmn.name.length;

  if (pkmn.name.endsWith(gf))
    pkmn.name = pkmn.name.slice(0, (nameLength - gf.length));

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

exports.pokemon = ingamePkmn;
exports.balls = balls;
exports.ballNames = ballNames;