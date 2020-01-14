const pokedata = require("./pokedata.js");
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

exports.bestBallsMsg = (pkmn, gFlag) => {
  let maxhp0 = baseStat(pkmn.HP, 0, 30);
  let maxhp31 = baseStat(pkmn.HP, 31, 70);

  let bestBalls = pokedata.balls.filter(x => {
    let notMB = x.name != "Master Ball";
    let notQB = x.name != "Quick Ball";
    return x.modifier >= 3 && notMB && notQB;
  });
  bestBalls.sort((x, y) => y.modifier > x.modifier);

  let messageToSend = gFlag? `The best Poké-Balls for catching G-Max ${pkmn.Name} are:` : `The best Poké-Balls for catching ${pkmn.Name} are:`;

  bestBalls.forEach(ball => {
    let pkmnCatchRate = gFlag? 3 : pkmn.CatchRate;
    let modCatchRate0 = catchRate(maxhp0, 1, pkmnCatchRate, ball.modifier);

    let modCatchRate31 = catchRate(maxhp31, 1, pkmnCatchRate, ball.modifier);

    let shakeProb0 = shakeProb(modCatchRate0);
    let shakeProb31 = shakeProb(modCatchRate31);

    catchProb0 = capProb(shakeProb0, modCatchRate0).toFixed(2);

    catchProb31 = capProb(shakeProb31, modCatchRate31).toFixed(2);

    ball.catchProb = `${catchProb0}% ~ ${catchProb31}%`;

    messageToSend = messageToSend.concat(`\n${ball.name}: ${ball.catchProb}`);
  });

  return messageToSend;
}

exports.bestBallMsg = (pkmn, ball, gFlag) => {
  let maxhp0 = baseStat(pkmn.HP, 0, 30);
  let maxhp31 = baseStat(pkmn.HP, 31, 70);

  let pkmnCatchRate = gFlag? 3 : pkmn.CatchRate;

  let modCatchRate0 = catchRate(maxhp0, 1, pkmnCatchRate, ball.modifier);
  let modCatchRate31 = catchRate(maxhp31, 1, pkmnCatchRate, ball.modifier);

  let shakeProb0 = shakeProb(modCatchRate0);
  let shakeProb31 = shakeProb(modCatchRate31);

  catchProb0 = capProb(shakeProb0, modCatchRate0).toFixed(2);
  catchProb31 = capProb(shakeProb31, modCatchRate31).toFixed(2);

  ball.catchProb = `${catchProb0}% ~ ${catchProb31}%`;

  let messageToSend = gFlag? `The probability of catching G-Max ${pkmn.Name} with a ${ball.name} is: ${ball.catchProb}` : `The probability of catching ${pkmn.Name} with a ${ball.name} is: ${ball.catchProb}` 

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
