const fs = require("fs");

let data = fs.readFileSync("./batch/pokemondata.json");
let pokeSON = JSON.parse(data);

var pokemon = pokeSON.pokemon;

data = fs.readFileSync("./batch/availablepokemon.json");
let availablepokemon = JSON.parse(data);

data = fs.readFileSync("./batch/balldata.json");
var balls = JSON.parse(data);

var ingamePkmn = pokemon.filter(x => {
  return availablepokemon.includes(x.Name);
});

ingamePkmn.forEach(pkmn => {
  let gf = "(Galarian Form)";
  let nameLength = pkmn.Name.length;

  if (pkmn.Name.endsWith(gf))
    pkmn.Name = pkmn.Name.slice(0, (nameLength - gf.length-1));

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