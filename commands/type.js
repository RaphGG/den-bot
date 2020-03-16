module.exports = {
  name: "Pokémon Type Match-Up Command",
  cmdName: "type",
  aliases: ["matchup", "types", "matchups"],
  description: "Shows a detailed summary of type matchups for the given type.",
  args: 1,
  usage: "{{prefix}}type [Pokémon Type 1] (Pokémon Type 2)",
  example: "{{prefix}}type fire flying",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};

const embedHelper = require("../modules/embedHelper.js");
const pokedata = require("../modules/pokedata.js");
const botspeech = require("../modules/botspeech.js");

const run = (client, message, args, settings) => {
  const types = pokedata.fetch("types", args, settings);
  if (!types)
  {
    message.channel.send(botspeech.typesNotFound)
      .then()
      .catch(console.error);
    return;
  }
  const embed = embedHelper.createEmbed("types", client, types);

  message.channel.send(embed)
    .then()
    .catch(console.error);

  return;
};