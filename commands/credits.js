module.exports = {
  name: "Credits Command",
  cmdName: "credits",
  aliases: ["credit"],
  description: "Displays a credit and thanks message.",
  args: false,
  usage: "{{prefix}}credits",
  example: "{{prefix}}credits",
  guildOnly: false,
  adminOnly: false,
  run(client, message) {
    run(client, message);
  }
};

const embedHelper = require("../modules/embedHelper.js");

const run = (client, message) => {
  const embed = embedHelper.createEmbed("credits", client);
  return message.channel.send(embed);
};