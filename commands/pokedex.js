module.exports = {
  name: "Pokémon Pokédex Command",
  cmdName: "pokedex",
  aliases: ["dex", "info"],
  description: "Shows a detailed summary of a Pokémon’s latest Statistics (Gen 8 / Gen 7).",
  args: 1,
  usage: "{{prefix}}pokedex [Pokémon Name] (Form)",
  example: "{{prefix}}pokedex eternamax eternatus",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};


const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");
const embedHelper = require("../modules/embedHelper.js");

// Pokedex Command Handler: Utilizes Pokedata's fetch & EmbedHelper's
// createEmbed to deliver a Pokedex entry of a given pokemon.
const run = (client, message, args, settings) => {

  // Fetch, Create, and Send.
  const pkmnObj = pokedata.fetch("pkmn", args, settings);

  if (pkmnObj)
  {
    message.channel.send(embedHelper.createEmbed("dex", client, pkmnObj))
      .then()
      .catch(console.error);
    return;
  }

  else
  {
    message.channel.send(botspeech.pkmnNotFound)
      .then()
      .catch(console.error);
    return;
  }
};