exports = {
  name: "Natures Chart",
  cmdName: "natures",
  aliases: ["nature"],
  description: "Delivers a RichEmbed with a chart of Pokèmon natures.",
  args: false,
  guildOnly: false,
  run: run(),
};

const embedHelper = require("../modules/embedHelper.js");

const run = (client, message) => {
  const embed = embedHelper.createEmbed("natures", client);
  return message.channel.send(embed);
};