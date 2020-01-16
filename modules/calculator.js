const pokedata = require("./pokedata.js");
const botspeech = require("./botspeech.js");

const baseStat = (stat, iv, level) => {
  let x = ( ( (2 * stat) + iv ) * level) / 100;
  return Math.floor(x) + level + 10;
}

const catchRate = (maxhp, currhp, catchRate, ballMod) => {
  return ((3*maxhp - 2*currhp) * (catchRate * ballMod)) / (3*maxhp);
}

const shakeProb = (catchRate) => {
  let b = 65536 / Math.pow((255/catchRate), 0.1875)
  return Math.floor(b);
}

const capProb = (shakeProb, modCatchRate) => {
  if (modCatchRate >= 100 || shakeProb >= 65536)
    return 100;

  return (Math.pow( (shakeProb/65535), 4) * 100);
}

const capProbRange = (pkmn, ball, gFlag, pFlag) => {
  let maxhp0 = baseStat(pkmn.HP, 0, 30);
  let maxhp31 = baseStat(pkmn.HP, 31, 70);

  let pkmnCatchRate = gFlag? 3 : pkmn.CatchRate;
  pkmnCatchRate = pFlag? 20 : pkmnCatchRate;

  let modCatchRate0 = catchRate(maxhp0, 1, pkmnCatchRate, ball.modifier);
  let modCatchRate31 = catchRate(maxhp31, 1, pkmnCatchRate, ball.modifier);

  let shakeProb0 = shakeProb(modCatchRate0);
  let shakeProb31 = shakeProb(modCatchRate31);

  catchProb0 = capProb(shakeProb0, modCatchRate0).toFixed(2);
  catchProb31 = capProb(shakeProb31, modCatchRate31).toFixed(2);

  return [catchProb0, catchProb31];
}

const modChecker = (ball, pkmn) => {
  // TODO: Implement typing for Net-Ball, weight for Heavy-Ball, gender for
  // Love-Ball
  switch (ball.name)
  {
    case "Fast Ball":
      return pkmn.Speed >= 100? 4 : 1;
    case "Moon Ball":
      return botspeech.moonPkmn.includes(pkmn.Name)? 4 : 1;
    default:
      return ball.modifier;
  }
}

exports.bestBallsMsg = (pkmn, gFlag) => {

  let balls = pokedata.balls;
  balls.forEach(x => {
    x.modifier = modChecker(x, pkmn);
  });

  let bestBalls = balls
    .filter(x => {
      let notExcludedBall = !botspeech.excludedBalls.includes(x.name);
      return x.modifier > 1 && notExcludedBall;
    })
    .sort((x, y) => y.modifier - x.modifier)
    .slice(0, 4);

  let messageToSend = gFlag? `The best balls for catching G-Max ${pkmn.Name} are:` : `The best balls for catching ${pkmn.Name} are:`;

  let promoFlag = (botspeech.promoPkmn.includes(pkmn.Name)) && (botspeech.gmaxPkmn.includes(pkmn.Name));

  bestBalls.forEach(ball => {

   let catchProb = capProbRange(pkmn, ball, gFlag, false);
   ball.catchProb = (catchProb[0] == catchProb[1])? `${catchProb[0]}%` : `${catchProb[0]}% ~ ${catchProb[1]}%`;

    messageToSend = messageToSend.concat(`\n${ball.name}: ${ball.catchProb}`);

    if (promoFlag)
    {
      let promoCatchProb = capProbRange(pkmn, ball, gFlag, true);
      let promoCatchRate = (promoCatchProb[0] == promoCatchProb[1])? `${promoCatchProb[0]}%` : `${promoCatchProb[0]}% ~ ${promoCatchProb[1]}%`;
      messageToSend = messageToSend.concat(` / G-Max Promo: ${promoCatchRate}`);
    }
  });

  let pokeball = balls.find(x => x.name == "Poke Ball");
  let catchProb = capProbRange(pkmn, pokeball, gFlag, false);
  pokeball.catchProb = (catchProb[0] == catchProb[1])? `${catchProb[0]}%` : `${catchProb[0]}% ~ ${catchProb[1]}%`;

  messageToSend = messageToSend.concat(`\nStandard Balls (Poké/Luxury/Premier): ${pokeball.catchProb}`);

  return messageToSend;
}

exports.bestBallMsg = (pkmn, ball, gFlag) => {
  pokedata.balls.forEach(x => {
    x.modifier = modChecker(x, pkmn);
  });

  let catchProb = capProbRange(pkmn, ball, gFlag, false);

  let promoFlag = (botspeech.promoPkmn.includes(pkmn.Name)) && (botspeech.gmaxPkmn.includes(pkmn.Name));

  ball.catchProb = (catchProb[0] == catchProb[1])? `${catchProb[0]}%` : `${catchProb[0]}% ~ ${catchProb[1]}%`;

  let messageToSend = gFlag? `The probability of catching G-Max ${pkmn.Name} with a ${ball.name} is: ${ball.catchProb}` : `The probability of catching ${pkmn.Name} with a ${ball.name} is: ${ball.catchProb}`;

  if (promoFlag)
  {
    let promoCatchProb = capProbRange(pkmn, ball, gFlag, true);
    let promoCatchRate = (promoCatchProb[0] == promoCatchProb[1])? `${promoCatchProb[0]}%` : `${promoCatchProb[0]}% ~ ${promoCatchProb[1]}%`;
    messageToSend = messageToSend.concat(` / G-Max Promo: ${promoCatchRate}`);
  }

  return messageToSend;
}

exports.ballFinder = (ballName) => {
  let foundName = pokedata.ballNames.find(name => {
    return name.toLowerCase() == ballName;
  });

  if (!foundName)
    return null;

  return pokedata.balls.find(ball => {
    if (ball.name == foundName)
      return true;

    let a = ball.name.toLowerCase().replace(" ball", "");
    let b = foundName.replace("ball", "");
    return a == b;
  });
}
