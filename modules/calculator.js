const pokedata = require("./pokedata.js");
const pokelists = require("../data/lists.js");
// TODO: Finish Comments.

// The structure here is fine, I would create a helper's class instead and add
// all this functions as members of that class, then export the class. It will
// keep your module tree a lot cleaner, and code easier to read/maintain.
// This is an example:
// https://github.com/caquillo07/telledu_server/blob/master/utils/Helper.js
// and how its used:
// https://github.com/caquillo07/telledu_server/blob/master/controllers/AdminController.js#L1
// https://github.com/caquillo07/telledu_server/blob/master/controllers/AdminController.js#L16
//
// The code indentation is inconsistent on this entire file.

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
  // I know this may seem like a nicer way to do it, since the code looks
  // "simpler", but in the real world this is incredibly discouraged, and
  // probably wouldn't get past code review. You should always surround all
  // if statements with { }. As it is right now, someone could accidentally
  // remove the spaces before "return 100;" and now you have a bug that's hard
  // to track.
  if (shakeProb >= 65536) {
    return 100;
  }

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

  const modCatchRate0 = catchRate(maxhp0, 1, pkmnCatchRate, ball.setmod);
  const modCatchRate31 = catchRate(maxhp31, 1, pkmnCatchRate, ball.setmod);

  const shakeProb0 = shakeProb(modCatchRate0);
  const shakeProb31 = shakeProb(modCatchRate31);

  const catchProb0 = capProb(shakeProb0).toFixed(2);
  const catchProb31 = capProb(shakeProb31).toFixed(2);

  // brackets on if statements
  if (isNaN(catchProb0) || isNaN(catchProb31)) {
    return [0, 0];
  }

  // This is a really weird pattern for JavaScript. Some languages support
  // multiple return statements, or even tuples. Im assuming this is what you
  // were going for here, but a better approach would be to return an object
  // instead. Something like:
  // return {
  //   catchProb0: catchProb0,
  //   catchProb31: catchProb31,
  // };
  return [catchProb0, catchProb31];
};

// Method to set modifier for all balls in pokedata.balls given a pkmn.
// TODO: Seperate from pokedata instance.
const setModifiers = (pkmn) => {
  pokedata.balls.forEach(ball => (ball.setmod = ball.modifier));

  const netBall = pkmn.type1 == "Bug" || pkmn.type1 == "Water" || pkmn.type2 == "Bug" || pkmn.type2 == "Water";
  const fastBall = pkmn.baseStats.spe >= 100;
  const moonBall = pokelists.moonPkmn.includes(pkmn.name);
  const loveBall = pkmn.genderRatio != "100% ⚲" && pkmn.genderRatio != "100% ♀" && pkmn.genderRatio != "100% ♂";
  const beastBall = pokelists.ultraBeasts.includes(pkmn.name);

  // brackets on all if/else statements
  if (pkmn.weight >= 300)
    // never use ==, always use === instead. JavaScript == can lead to weird
    // and hard to trace bugs. Here is a nice read one it:
    // https://www.impressivewebs.com/why-use-triple-equals-javascipt/
    //
    // Another thing, you are once again dynamically adding fields to an object
    // that were not previously declared. You should have a default value for
    // .setmod in your ball object, so it's easier to track and find all
    // possible fields for the ball object. Better yet, I would create a Ball
    // class with setters and getters for this properties :).
    //
    // One thing to remember, magic in software is bad, dynamically setting
    // fields on an object is magic, therefore dynamically setting is bad.
    pokedata.balls.find(x => x.name == "Heavy Ball").setmod = 30;

  else if (pkmn.weight >= 200)
    pokedata.balls.find(x => x.name == "Heavy Ball").setmod = 20;

  else
    pokedata.balls.find(x => x.name == "Heavy Ball").setmod = 1;

  const nb = pokedata.balls.find(x => x.name == "Net Ball");
  // Same as above, you are magically adding fields to the pokeball object,
  // magic is bad.
  nb.setmod = netBall? 3.5 : 1;
  nb.assumption = netBall;

  const fb = pokedata.balls.find(x => x.name == "Fast Ball");
  fb.setmod = fastBall? 4 : 1;
  fb.assumption = fastBall;

  const mb = pokedata.balls.find(x => x.name == "Moon Ball");
  mb.setmod = moonBall? 4 : 1;
  mb.assumption = moonBall;

  const lb = pokedata.balls.find(x => x.name == "Love Ball");
  lb.setmod = loveBall? 8 : 1;
  lb.assumption = loveBall;

  const bb = pokedata.balls.find(x => x.name == "Beast Ball");
  bb.setmod = beastBall? 5 : 0.1;
  bb.assumption = beastBall;
};

// Having all exports at the end of the file is great, but as with the botspeech,
// return one object with the fields you want instead of appending the fields
// directly on the exports object.
exports.bestBalls = (pkmnObj) => {
  pkmnObj.catchProb = [];
  pkmnObj.promoCatchProb = [];
  const gmax = pkmnObj.form == "Gigantamax";
  // dead code, should remove.
  // console.log("form: " + pkmnObj.form)
  pkmnObj.promo = (pokelists.promoPkmn.includes(pkmnObj.pkmn.name)) && (gmax);

  setModifiers(pkmnObj.pkmn);

  const bestBalls = pokedata.balls
    .filter(x => {
      const notExcludedBall = !pokelists.excludedBalls.includes(x.name);
      return x.setmod > 1 && notExcludedBall;
    })
    .sort((x, y) => y.setmod - x.setmod)
    .slice(0, 4);

  bestBalls.forEach(ball => {

   const catchProbRange = capProbRange(pkmnObj.pkmn, ball, gmax, false);

   // Nothing necessarily wrong here. The ternary operator is a cool feature,
   // but this is hard to read, so I would use a boring old if statement instead.
   const catchProb = (catchProbRange[0] == catchProbRange[1])? `\`${catchProbRange[0]}%\`` : `\`${catchProbRange[0]}% ~ ${catchProbRange[1]}%\``;
   pkmnObj.catchProb.push(catchProb);

   // Nice! In javascript you want the opening bracket on this same line as the
    // if statement.
    if (pkmnObj.promo) {
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

  // tons of magic here, same with the ball object, I would create a Pokemon
  // class with getters and setters
  pkmnObj.promo = (pokelists.promoPkmn.includes(pkmnObj.pkmn.name)) && gmax;

  pkmnObj.catchProb = (catchProb[0] == catchProb[1])? `${catchProb[0]}%` : `${catchProb[0]}% ~ ${catchProb[1]}%`;

  if (pkmnObj.promo)
  {
    const promoCatchProb = capProbRange(pkmnObj.pkmn, ball, gmax, true);
    pkmnObj.promoCatchProb = (promoCatchProb[0] == promoCatchProb[1])? `${promoCatchProb[0]}%` : `${promoCatchProb[0]}% ~ ${promoCatchProb[1]}%`;
  }
};