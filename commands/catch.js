const calc = require("../modules/calculator.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const pokelists = require("../data/lists.js");
const Discord = require("discord.js");

exports.run = (client, message, args) => {

  let catchEmbed = new Discord.RichEmbed();
  catchEmbed.setFooter(botspeech.footerCred, client.user.avatarURL);

  let gmax = new RegExp(/gmax|gigantamax/, 'gi');

  if (!args || args.length < 1)
    return message.channel.send(botspeech.catchNoArg);

  else if (args.length == 1)
  {
    let pkmn = pokedata.fetch("pkmn", args);
    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (args[0].match(gmax))
      return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));

    else
      return message.channel.send(calc.bestBallsMsg(pkmn, false, catchEmbed));
  }

  else if (args.length == 2)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmn2 = pokedata.fetch("pkmn", args)
    let ball = pokedata.fetch("ball", args.slice(1));

    if (pkmn)
    {
      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (args[0].match(gmax))
        return message.channel.send(calc.bestBallMsg(pkmn, ball, true));
      
      else
        return message.channel.send(calc.bestBallMsg(pkmn, ball, false));
    }

    else if (pkmn2)
    {
      if (args[1].match(gmax))
        return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));

      else
        return message.channel.send(calc.bestBallsMsg(pkmn, false, catchEmbed));
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 2));
    let ball = pokedata.fetch("ball", args.slice(2));
    
    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (!ball)
      return message.channel.send(botspeech.ballNotFound);

    else if (args[1].match(gmax))
      return message.channel.send(calc.bestBallMsg(pkmn, ball, true));

    else
      return message.channel.send(calc.bestBallMsg(pkmn, ball, false));
  }

  /*

  else if (args.length == 1)
  {
    let pkmn = pokedata.fetch("pkmn", args);

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (args[0].match(/-gmax|-gigantamax/))
      return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));

    else
      return message.channel.send(calc.bestBallsMsg(pkmn, false, catchEmbed));
  }

  else if (args.length == 2)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmn2 = pokedata.fetch("pkmn", args);

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args.slice(1, 2));
      let gmax = args[0].match(/-gmax|-gigantamax/);

      if (gmax)
      {
        if (ball)
          return message.channel.send(calc.bestBallMsg(pkmn, ball, true));

        else 
      }
        return message.channel.send(calc.bestBallMsg(pkmn, ball, false));

      else if (gmax)
      {
        if (!gmaxForm)
          return message.channel.send(botspeech.gmaxNotFound);

        return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));
      }

      else
        return message.channel.send(botspeech.argNotFound + '\n' + botspeech.catchExample2 + '\`\`\`');
    }

    else if (pkmn2)
      return message.channel.send(calc.bestBallsMsg(pkmn2, false, catchEmbed));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));
    let pkmn2 = pokedata.fetch("pkmn", args.slice(0, 2));

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args.slice(1, 2));
      let gmax = pokeLists.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (gmax)
      {
        if (!gmaxForm)
          return message.channel.send(botspeech.gmaxNotFound);

        return message.channel.send(calc.bestBallMsg(pkmn, ball, true));
      }

      else
        return message.channel.send(botspeech.argNotFound + '\n' + botspeech.catchExample3 + '\`\`\`');
    }

    else if (pkmn2)
    {
      let ball = pokedata.fetch("ball", args.slice(2, 3));
      let gmax = pokeLists.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      else if (gmax)
      {
        if (!gmaxForm)
          return message.channel.send(botspeech.gmaxNotFound);

        return message.channel.send(calc.bestBallsMsg(pkmn2, true, catchEmbed));
      }

      else
        return message.channel.send(botspeech.argNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 4)
  {
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 2));
    let ball = pokedata.fetch("ball", args.slice(2, 3));
    let gmax = pokeLists.gigaKeywords.includes(args[3].toLowerCase());
    let gmaxForm = pkmn.forms.includes("Gigantamax");

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    else if (!ball)
      return message.channel.send(botspeech.ballNotFound);

    else if (gmax)
    {
      if (!gmaxForm)
        return message.channel.send(botspeech.gmaxNotFound);
      
      return message.channel.send(calc.bestBallMsg(pkmn, ball, true));
    }

    return message.channel.send(botspeech.argNotFound + '\`\`\`');
  }
}
*/
/*
  else if (args.length == 1)
  {
    let pkmn = pokedata.fetch("pkmn", args);

    if (!pkmn)
      return message.channel.send(botspeech.pkmnNotFound);

    return message.channel.send( calc.bestBallsMsg(pkmn, false, catchEmbed) );
  }

  else if (args.length == 2)
  {
    let pkmn = pokedata.fetch("pkmn", args[0]);
    let pkmn2 = pokedata.fetch("pkmn", args);

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args[1])
      let gmax = botspeech.gigaKeywords.includes(args[1].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");
      if (gmax && gmaxForm)
        return message.channel.send(calc.bestBallsMsg(pkmn, true, catchEmbed));

      else if (ball)
        return message.channel.send(calc.bestBallMsg(pkmn, ball, false));

      else
        return message.channel.send(botspeech.argNotFound);
    }

    else if (pkmn2)
      return message.channel.send(calc.bestBallsMsg(pkmn2, false, catchEmbed));

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmn = pokedata.fetch("pkmn", args[0]);
    let pkmn = pokedata.fetch("pkmn", args.slice(0, 1));

    if (pkmn)
    {
      let ball = pokedata.fetch("ball", args[1]);
      let gmax = botspeech.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (!ball)
        return message.channel.send(botspeech.ballNotFound);

      
    }

    else if (pkmn2)
    {
      let ball = pokedata.fetch("ball", args[2]);
      let gmax = botspeech.gigaKeywords.includes(args[2].toLowerCase());
      let gmaxForm = pkmn.forms.includes("Gigantamax");

      if (gmax && gmaxForm)
        return message.channel.send(calc.bestBallsMsg(pkmn2, true, catchEmbed));

      else if (ball)
        return message.channel.send(calc.bestBallMsg(pkmn2, ball, false));
      
      else
        return message.channel.send(botspeech.argNotFound);
    }

    else
      return message.channel.send(botspeech.pkmnNotFound);
  }

  else if (args.length == 4)
  {
    let pkmn = pokedata.fetch("pkmn", args[0]);
    let pkmn2 = pokedata.fetch("pkmn", args.slice(0, 1));

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

    let pkmn = pokedata.pokemon.find(x => {
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
*/