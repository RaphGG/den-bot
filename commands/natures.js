module.exports = {
  name: "Natures Chart",
  cmdName: "natures",
  aliases: ["nature"],
  description: "Displays an in-depth Pokémon natures chart from Bulbapedia.",
  args: false,
  guildOnly: false,
  adminOnly: false,
  run(client, message) {
    run(client, message);
  }
};

const embedHelper = require("../modules/embedHelper.js");

const run = (client, message) => {
  const embed = embedHelper.createEmbed("natures", client);
  return message.channel.send(embed);
};