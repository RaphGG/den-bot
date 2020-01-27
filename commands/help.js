const botspeech = require("../modules/botspeech.js");
const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.

exports.run = (client, message) => {
  let guildMember = message.member;
  let embed = embedHelper.createEmbed("help", guildMember, client);
  return message.channel.send(embed);
}