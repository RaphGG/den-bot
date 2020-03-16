module.exports = {
  name: "Pokémon Game Sprite Command",
  cmdName: "sprite",
  aliases: ["sprites", "pic", "s"],
  description: "Displays a Pokémon's Latest In-Game Sprite!",
  args: 1,
  usage: "{{prefix}}sprite [Pokémon] (Form)",
  example: "{{prefix}}sprite gmax zard",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};

const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");
const botspeech = require("../modules/botspeech.js");

const run = (client, message, args, settings) => {
  const pkmnObj = pokedata.fetch("pkmn", args, settings);

  // console.log(pkmnObj);

  if (!pkmnObj)
  {
    message.channel.send(botspeech.pkmnNotFound)
      .then()
      .catch(console.error);
    return;
  }

  try
  {
    const pkmnSprite = embedHelper.imageFinder(pkmnObj);
    // console.log(pkmnSprite);
    message.channel.send({ files:[pkmnSprite] })
      .then()
      .catch(console.error);

  }
  catch (error)
  {
    console.error();
  }

  return;
};