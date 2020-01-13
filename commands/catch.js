else if (command === "catch")
{
  if (args.length == 0)
  {
    return message.channel.send("Please enter a Pokémon to catch followed by a ball of your choice.");
  }

  else if (args.length == 1)
  {
    let pkmn = ingamePkmn.find(x => {return x.Name.toLowerCase() == args[0].toLowerCase()});

    if (pkmn == null)
      return message.channel.send(pkmnNotFound);

    return message.channel.send( bestBallsCalc(pkmn, false) );
  }

  else if (args.length == 2)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName
    });

    let pkmn2 = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let ball = ballFinder( args[1].toLowerCase() );

      if (gigaKeywords.includes(args[1].toLowerCase()))
        return message.channel.send( bestBallsCalc(pkmn, true) );

      else if (ball)
        return message.channel.send( bestBallCalc( pkmn, ball, false) );

      else
        return message.channel.send(argNotFound);
    }

    else if (pkmn2)
      return message.channel.send( bestBallsCalc(pkmn2, false) );

    else
      return message.channel.send(pkmnNotFound);
  }

  else if (args.length == 3)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName
    });

    let pkmn2 = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let ballName = args[1].toLowerCase();
      let ballName2 = (args[1] + " " + args[2]).toLowerCase();

      let ball = ballFinder(ballName);
      let ball2 = ballFinder(ballName2);

      if (ball2)
        return message.channel.send( bestBallCalc(pkmn, ball2, false) );

      else if (ball)
      {
        if (gigaKeywords.includes(args[2].toLowerCase()))
          return message.channel.send( bestBallCalc(pkmn, ball, true) );

        else
          message.channel.send(argNotFound);
      }

      else
        return message.channel.send(ballNotFound);
    }

    else if (pkmn2)
    {
      let ballName = args[2].toLowerCase();
      let ball = ballFinder(ballName);

      if (gigaKeywords.includes(args[2].toLowerCase()))
        return message.channel.send( bestBallsCalc(pkmn2, true) );

      else if (ball)
        return message.channel.send( bestBallCalc(pkmn2, ball, false) );
      
      else
        return message.channel.send(argNotFound);
    }

    else
      return message.channel.send(pkmnNotFound);
  }

  else if (args.length == 4)
  {
    let pkmnName = args[0].toLowerCase();
    let pkmnName2 = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName
    });

    let pkmn2 = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName2
    });

    if (pkmn)
    {
      let ballName = (args[1] + " " + args[2]).toLowerCase();
      let ball = ballFinder(ballName);

      if (!ball)
        return message.channel.send(ballNotFound);

      else if (!gigaKeywords.includes(args[3].toLowerCase()))
        return message.channel.send(argNotFound);

      else
        return message.channel.send( bestBallCalc(pkmn, ball, true) );
    }

    else if (pkmn2)
    {
      let ballName = args[2].toLowerCase();
      let ballName2 = (args[2] + " " + args[3]).toLowerCase();

      let ball = ballFinder(ballName);
      let ball2 = ballFinder(ballName2);

      if (ball2)
        return message.channel.send( bestBallCalc(pkmn2, ball2, false) );

      else if (ball)
      {
        if (gigaKeywords.includes(args[3].toLowerCase()))
          return message.channel.send( bestBallCalc(pkmn2, ball, true) );

        else
          message.channel.send(argNotFound);
      }

      else
        return message.channel.send(ballNotFound);
    }

    else
      return message.channel.send(pkmnNotFound);
  }

  else if (args.length == 5)
  {
    let pkmnName = (args[0] + " " + args[1]).toLowerCase();

    let pkmn = ingamePkmn.find(x => {
      return x.Name.toLowerCase() == pkmnName
    });

    let ballName = (args[2] + " " + args[3]).toLowerCase();
    let ball = ballFinder(ballName);

    if (!pkmn)
      return message.channel.send(pkmnNotFound);

    else if (!ball)
      return message.channel.send(ballNotFound);

    else if (!gigaKeywords.includes(args[4].toLowerCase()))
      return message.channel.send(argNotFound);

    else
      return message.channel.send( bestBallCalc(pkmn, ball, true) );
  }
}
});