const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const Discord = require("discord.js");

exports.run = (client, message, args) => {

  let catchEmbed = new Discord.RichEmbed();
  catchEmbed.setFooter(botspeech.footerCred, client.user.avatarURL);

  if (!args || args.length < 1)
    return message.channel.send(botspeech.catchNoArg);

  else if (args.length == 1)
  {
    let pkmn = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == args[0].toLowerCase();
    });

    if (pkmn == null)
      return message.channel.send(botspeech.pkmnNotFound);

    return message.channel.send( calc.bestBallsMsg(pkmn, false, catchEmbed) );
  }

  else if (args.length == 2)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    let pkmn2 = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let arg1 = args[1].toLowerCase();
      let ball = calc.ballFinder( arg1 );

      if (botspeech.gigaKeywords.includes(arg1))
        return message.channel.send( calc.bestBallsMsg(pkmn, true, catchEmbed) );

      else if (ball)
        return message.channel.send( calc.bestBallMsg(pkmn, ball, false) );

      else
        return message.channel.send(botspeech.argNotFound);
    }

    else if (pkmn2)
      return message.channel.send( calc.bestBallsMsg(pkmn2, false, catchEmbed) );

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    let pkmn2 = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let ballName = args[1].toLowerCase();
      let ballName2 = (args[1] + " " + args[2]).toLowerCase();

      let ball = calc.ballFinder(ballName);
      let ball2 = calc.ballFinder(ballName2);

      if (ball2)
        return message.channel.send( calc.bestBallMsg(pkmn, ball2, false) );

      else if (ball)
      {
        if (botspeech.gigaKeywords.includes(args[2].toLowerCase()))
          return message.channel.send( calc.bestBallMsg(pkmn, ball, true) );

        else
          message.channel.send(botspeech.argNotFound);
      }

      else
        return message.channel.send(botspeech.ballNotFound);
    }

    else if (pkmn2)
    {
      let ballName = args[2].toLowerCase();
      let ball = calc.ballFinder(ballName);

      if (botspeech.gigaKeywords.includes(args[2].toLowerCase()))
        return message.channel.send( calc.bestBallsMsg(pkmn2, true, catchEmbed) );

      else if (ball)
        return message.channel.send( calc.bestBallMsg(pkmn2, ball, false) );
      
      else
        return message.channel.send(botspeech.argNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 4)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    let pkmn2 = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let ballName = (args[1] + " " + args[2]).toLowerCase();
      let ball = calc.ballFinder(ballName);

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (!botspeech.gigaKeywords.includes(args[3].toLowerCase()))
        return message.channel.send(botspeech.argNotFound);

      else
        return message.channel.send( calc.bestBallMsg(pkmn, ball, true) );
    }

    else if (pkmn2)
    {
      let ballName = args[2].toLowerCase();
      let ballName2 = (args[2] + " " + args[3]).toLowerCase();

      let ball = calc.ballFinder(ballName);
      let ball2 = calc.ballFinder(ballName2);

      if (ball2)
        return message.channel.send( calc.bestBallMsg(pkmn2, ball2, false) );

      else if (ball)
      {
        if (botspeech.gigaKeywords.includes(args[3].toLowerCase()))
          return message.channel.send( calc.bestBallMsg(pkmn2, ball, true) );

        else
          message.channel.send(botspeech.argNotFound);
      }

      else
        return message.channel.send(botspeech.ballNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 5)
  {
    let pkmnName = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = pokedata.ingamePkmn.find(x => {
      return x.name.toLowerCase() == pkmnName
    });

    let ballName = (args[2] + " " + args[3]).toLowerCase();
    let ball = calc.ballFinder(ballName);

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (!ball)
      return message.channel.send(botspeech.ballNotFound);

    else if (!botspeech.gigaKeywords.includes(args[4].toLowerCase()))
      return message.channel.send(botspeech.argNotFound);

    else
      return message.channel.send( calc.bestBallMsg(pkmn, ball, true) );
  }
}