module.exports = {
  name: "Natures Chart Command",
  cmdName: "natures",
  aliases: ["nature"],
  description: "Displays an in-depth Pokémon natures chart from Bulbapedia.",
  args: false,
  usage: "{{prefix}}natures",
  example: "{{prefix}}natures",
  guildOnly: false,
  adminOnly: false,
  run(client, message) {
    run(client, message);
  }
};

const embedHelper = require("../modules/embedHelper.js");

const run = (client, message) => {
  const embed = embedHelper.createEmbed("natures", client);
  message.channel.send(embed)
    .then()
    .catch(console.error);
  return;
};