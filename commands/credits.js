const embedHelper = require("../modules/embedHelper.js");

exports.run = (client, message) => {
  const embed = embedHelper.createEmbed("credits", client);
  return message.channel.send(embed);
};