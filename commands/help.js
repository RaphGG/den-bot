const botspeech = require("../modules/botspeech.js");
const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.

exports.run = (client, message) => {
  let embed = embedHelper.createEmbed("help", client);
  return message.channel.send(embed);
}