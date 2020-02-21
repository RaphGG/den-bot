const embedHelper = require("../modules/embedHelper.js");
exports.run = (client, message) => {
  const embed = embedHelper.createEmbed("invite", client);
  return message.channel.send(embed);
};