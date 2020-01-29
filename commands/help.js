const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.

exports.run = (client, message) => {
  let settings = client.settings.get(message.guild.id);
  let isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.includes(role.id);
  });
  let prefix = settings.prefix
  let embed = embedHelper.createEmbed("help", client, [isAdmin, prefix]);
  return message.channel.send(embed);
}