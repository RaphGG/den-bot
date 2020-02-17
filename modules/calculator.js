const pokedata = require("./pokedata.js");
const pokelists = require("../data/lists.js");
// TODO: Finish Comments.

// Stat calculator using base stat, iv, and level of a pkmn.
const baseStat = (stat, iv, level) => {
  const x = (((2 * stat) + iv) * level) / 100;
  return Math.floor(x) + level + 10;
};

// Modified catch rate calculator with raid assumptions.
// i.e => status effects are not present.
const catchRate = (maxhp, currhp, catchRate, ballMod) => {
  return ((3*maxhp - 2*currhp) * (catchRate * ballMod)) / (3*maxhp);
};

// Shake Probability calculator using a pkmn's modified catch rate.
const shakeProb = (catchRate) => {
  const b = 65536 / Math.pow((255/catchRate), 0.1875);
  return Math.floor(b);
};

// Final capture probability calculator using a pkmn's shake probability.
const capProb = (shakeProb) => {
  if (shakeProb >= 65536)
    return 100;

  return (Math.pow((shakeProb/65535), 4) * 100);
};

// Capture probability range calculator for gen 8 pkmn raids. Uses above
// calculators and raid assumptions to compute final range. These assumptions
// include: No status effects, pkmn at level 30 with 0 hp iv, pkmn at level 70
// with 31 hp iv, modified base catch rates given gigantamax forms and promoted
// events, certain balls only, and more.
const capProbRange = (pkmn, ball, gFlag, pFlag) => {
  const maxhp0 = baseStat(pkmn.baseStats.hp, 0, 30);
  const maxhp31 = baseStat(pkmn.baseStats.hp, 31, 70);

  let pkmnCatchRate = gFlag? 3 : pkmn.catchRate;
  pkmnCatchRate = pFlag? 20 : pkmnCatchRate;

  const modCatchRate0 = catchRate(maxhp0, 1, pkmnCatchRate, ball.modifier);
  const modCatchRate31 = catchRate(maxhp31, 1, pkmnCatchRate, ball.modifier);

  const shakeProb0 = shakeProb(modCatchRate0);
  const shakeProb31 = shakeProb(modCatchRate31);

  const catchProb0 = capProb(shakeProb0).toFixed(2);
  const catchProb31 = capProb(shakeProb31).toFixed(2);

  if (isNaN(catchProb0) || isNaN(catchProb31))
    return [0, 0];

  return [catchProb0, catchProb31];
};

// Method to set modifier for all balls in pokedata.balls given a pkmn.
// TODO: Seperate from pokedata instance.
const setModifiers = (pkmn) => {

  const netBall = pkmn.type1 == "Bug" || pkmn.type1 == "Water" || pkmn.type2 == "Bug" || pkmn.type2 == "Water";
  const fastBall = pkmn.baseStats.spe >= 100;
  const moonBall = pokelists.moonPkmn.includes(pkmn.name);
  const loveBall = pkmn.genderRatio != "100% ⚲" && pkmn.genderRatio != "100% ♀" && pkmn.genderRatio != "100% ♂";
  const beastBall = pokelists.ultraBeasts.includes(pkmn.name);

  if (pkmn.weight >= 300)
    pokedata.balls.find(x => x.name == "Heavy Ball").modifier = 30;

  else if (pkmn.weight >= 200)
    pokedata.balls.find(x => x.name == "Heavy Ball").modifier = 20;

  else if (pkmn.weight >= 100)
    pokedata.balls.find(x => x.name == "Heavy Ball").modifier = 0;

  else
    pokedata.balls.find(x => x.name == "Heavy Ball").modifier = -20;

  const nb = pokedata.balls.find(x => x.name == "Net Ball");
  nb.modifier = netBall? 3.5 : 1;
  nb.assumption = netBall;

  const fb = pokedata.balls.find(x => x.name == "Fast Ball");
  fb.modifier = fastBall? 4 : 1;
  fb.assumption = fastBall;

  const mb = pokedata.balls.find(x => x.name == "Moon Ball");
  mb.modifier = moonBall? 4 : 1;
  mb.assumption = moonBall;

  const lb = pokedata.balls.find(x => x.name == "Love Ball");
  lb.modifier = loveBall? 8 : 1;
  lb.assumption = loveBall;

  const bb = pokedata.balls.find(x => x.name == "Beast Ball");
  bb.modifier = beastBall? 5 : 0.1;
  bb.assumption = beastBall;
};

exports.bestBalls = (pkmnObj) => {
  pkmnObj.catchProb = [];
  pkmnObj.promoCatchProb = [];
  const gmax = pkmnObj.form == "Gigantamax";
  // console.log("form: " + pkmnObj.form)
  pkmnObj.promo = (pokelists.promoPkmn.includes(pkmnObj.pkmn.name)) && (gmax);

  setModifiers(pkmnObj.pkmn);

  const bestBalls = pokedata.balls
    .filter(x => {
      const notExcludedBall = !pokelists.excludedBalls.includes(x.name);
      return x.modifier > 1 && notExcludedBall;
    })
    .sort((x, y) => y.modifier - x.modifier)
    .slice(0, 4);

  bestBalls.forEach(ball => {

   const catchProbRange = capProbRange(pkmnObj.pkmn, ball, gmax, false);
   const catchProb = (catchProbRange[0] == catchProbRange[1])? `\`${catchProbRange[0]}%\`` : `\`${catchProbRange[0]}% ~ ${catchProbRange[1]}%\``;
   pkmnObj.catchProb.push(catchProb);

    if (pkmnObj.promo)
    {
      const promoCatchRange = capProbRange(pkmnObj.pkmn, ball, gmax, true);
      const promoCatchProb = (promoCatchRange[0] == promoCatchRange[1])? `\`${promoCatchRange[0]}%\`` : `\`${promoCatchRange[0]}% ~ ${promoCatchRange[1]}%\``;
      pkmnObj.promoCatchProb.push(promoCatchProb);
    }
  });

  const pokeball = pokedata.balls.find(x => x.name == "Poke Ball");
  const catchProb = capProbRange(pkmnObj.pkmn, pokeball, gmax, false);
  pkmnObj.pbCatchProb = (catchProb[0] == catchProb[1])? `\`${catchProb[0]}%\`` : `\`${catchProb[0]}% ~ ${catchProb[1]}%\``;

  return bestBalls;
};

exports.bestBall = (pkmnObj, ball) => {
  setModifiers(pkmnObj.pkmn);

  const gmax = pkmnObj.form == "Gigantamax";

  const catchProb = capProbRange(pkmnObj.pkmn, ball, gmax, false);

  pkmnObj.promo = (pokelists.promoPkmn.includes(pkmnObj.pkmn.name)) && gmax;

  pkmnObj.catchProb = (catchProb[0] == catchProb[1])? `${catchProb[0]}%` : `${catchProb[0]}% ~ ${catchProb[1]}%`;

  if (pkmnObj.promo)
  {
    const promoCatchProb = capProbRange(pkmnObj.pkmn, ball, gmax, true);
    pkmnObj.promoCatchProb = (promoCatchProb[0] == promoCatchProb[1])? `${promoCatchProb[0]}%` : `${promoCatchProb[0]}% ~ ${promoCatchProb[1]}%`;
  }
};