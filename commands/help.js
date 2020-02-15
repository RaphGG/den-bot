const embedHelper = require("../modules/embedHelper.js");
// TODO: Finish Comments.

exports.run = (client, message) => {
  let settings = client.settings.get(message.guild.id);
  let isOwner = message.member.id == settings.ownerID;
  let isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {
      return adminrole.id == role.id
    });
  });
  let ownerOrAdmin = isOwner || isAdmin;
  let prefix = settings.prefix
  let embed = embedHelper.createEmbed("help", client, [ownerOrAdmin, prefix]);
  return message.channel.send(embed);
}