const embedHelper = require("../modules/embedHelper.js");

exports.run = (client, message) => {
  const embed = embedHelper.createEmbed("natures", client);
  return message.channel.send(embed);
};