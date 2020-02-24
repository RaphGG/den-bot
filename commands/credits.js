exports = {
  name: "Credits Command",
  cmdName: "credits",
  aliases: ["credit"],
  description: "Reports the bot's average ping latency and message response time.",
  args: false,
  guildOnly: false,
  run: run(),
};

const embedHelper = require("../modules/embedHelper.js");

const run = (client, message) => {
  const embed = embedHelper.createEmbed("credits", client);
  return message.channel.send(embed);
};