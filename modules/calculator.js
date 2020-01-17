const pokedata = require("./pokedata.js");
const botspeech = require("./botspeech.js");
const Discord = require("discord.js");

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
  let maxhp0 = baseStat(pkmn.baseStats.hp, 0, 30);
  let maxhp31 = baseStat(pkmn.baseStats.hp, 31, 70);

  let pkmnCatchRate = gFlag? 3 : pkmn.catchRate;
  pkmnCatchRate = pFlag? 20 : pkmnCatchRate;

  let modCatchRate0 = catchRate(maxhp0, 1, pkmnCatchRate, ball.modifier);
  let modCatchRate31 = catchRate(maxhp31, 1, pkmnCatchRate, ball.modifier);

  let shakeProb0 = shakeProb(modCatchRate0);
  let shakeProb31 = shakeProb(modCatchRate31);

  catchProb0 = capProb(shakeProb0, modCatchRate0).toFixed(2);
  catchProb31 = capProb(shakeProb31, modCatchRate31).toFixed(2);

  if (isNaN(catchProb0) || isNaN(catchProb31))
    return [0, 0];

  return [catchProb0, catchProb31];
}

const setModifiers = (pkmn, balls) => {
  // TODO: Implement typing for Net-Ball, weight for Heavy-Ball, gender for
  // Love-Ball
  let netBall = pkmn.type1 == "Bug" || pkmn.type1 == "Water" || pkmn.type2 == "Bug" || pkmn.type2 == "Water";
  let fastBall = pkmn.baseStats.spe >= 100;
  let moonBall = botspeech.moonPkmn.includes(pkmn.name);
  let loveBall = "TODO";

  balls.find(x => x.name == "Net Ball").modifier = netBall? 3.5 : 1;
  
  if (pkmn.weight >= 300)
    balls.find(x => x.name == "Heavy Ball").modifier = 30;
  
  else if (pkmn.weight >= 200)
    balls.find(x => x.name == "Heavy Ball").modifier = 20;

  else if (pkmn.weight >= 100)
    balls.find(x => x.name == "Heavy Ball").modifier = 0;

  else
    balls.find(x => x.name == "Heavy Ball").modifier = -20;

  balls.find(x => x.name == "Fast Ball").modifier = fastBall? 4 : 1;

  balls.find(x => x.name == "Moon Ball").modifier = moonBall? 4 : 1;
}

exports.bestBallsMsg = (pkmn, gFlag, catchEmbed) => {

  setModifiers(pkmn, pokedata.balls);

  let bestBalls = pokedata.balls
    .filter(x => {
      let notExcludedBall = !botspeech.excludedBalls.includes(x.name);
      return x.modifier > 1 && notExcludedBall;
    })
    .sort((x, y) => y.modifier - x.modifier)
    .slice(0, 4);

  let description = gFlag? `The best balls for catching G-Max ${pkmn.name} are:` : `The best balls for catching ${pkmn.name} are:`;


  catchEmbed.setImage(botspeech.imageFinder(pkmn));
  catchEmbed.setColor(botspeech.colorFinder(pkmn));

  catchEmbed.setTitle("Best Catch Rates");
  catchEmbed.setDescription(description);

  let fieldVal = "";
  let gmaxPromo = "";

  let promoFlag = (botspeech.promoPkmn.includes(pkmn.name)) && (botspeech.gmaxPkmn.includes(pkmn.name));

  bestBalls.forEach(ball => {

   let catchProb = capProbRange(pkmn, ball, gFlag, false);
   ball.catchProb = (catchProb[0] == catchProb[1])? `\`${catchProb[0]}%\`` : `\`${catchProb[0]}% ~ ${catchProb[1]}%\``;

  fieldVal = fieldVal.concat(`\n${ball.name}: ${ball.catchProb}`);

    if (promoFlag)
    {
      let promoCatchProb = capProbRange(pkmn, ball, gFlag, true);
      let promoCatchRate = (promoCatchProb[0] == promoCatchProb[1])? `\`${promoCatchProb[0]}%\`` : `\`${promoCatchProb[0]}% ~ ${promoCatchProb[1]}%\``;
      gmaxPromo = gmaxPromo.concat(`\n${ball.name}: ${promoCatchRate}`);
    }
  });

  catchEmbed.addField("Top 4:", fieldVal, true);
  fieldVal = "";

  if (promoFlag)
    catchEmbed.addField("G-Max Promo Top 4:", gmaxPromo, true);

  let pokeball = pokedata.balls.find(x => x.name == "Poke Ball");
  let catchProb = capProbRange(pkmn, pokeball, gFlag, false);
  pokeball.catchProb = (catchProb[0] == catchProb[1])? `\`${catchProb[0]}%\`` : `\`${catchProb[0]}% ~ ${catchProb[1]}%\``;

  fieldVal = fieldVal.concat(`\nStandard Balls (Poké/Luxury/Premier): ${pokeball.catchProb}`);

  catchEmbed.addField("Standard:", fieldVal, true);

  return catchEmbed;
}

exports.bestBallMsg = (pkmn, ball, gFlag) => {
  setModifiers(pkmn, pokedata.balls);

  let catchProb = capProbRange(pkmn, ball, gFlag, false);

  let promoFlag = (botspeech.promoPkmn.includes(pkmn.name)) && (botspeech.gmaxPkmn.includes(pkmn.name));

  ball.catchProb = (catchProb[0] == catchProb[1])? `${catchProb[0]}%` : `${catchProb[0]}% ~ ${catchProb[1]}%`;

  let messageToSend = gFlag? `\nThe probability of catching G-Max ${pkmn.name} with a ${ball.name} is: ${ball.catchProb}` : `\nThe probability of catching ${pkmn.name} with a ${ball.name} is: ${ball.catchProb}`;

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
