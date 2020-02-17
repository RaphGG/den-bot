const embedHelper = require("../modules/embedHelper.js");

// Help Command Handler: Delivers bot's help message
// depending on the type of user that requested it (Non-Admin / Admin).
exports.run = (client, message) => {

  // Settings retrieval & Permissions check for corresponding
  // help embed.
  const settings = client.settings.get(message.guild.id);
  const isOwner = message.member.id == settings.ownerID;
  const isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {
      return adminrole.id == role.id;
    });
  });

  const ownerOrAdmin = isOwner || isAdmin;
  const prefix = settings.prefix;
  const embed = embedHelper.createEmbed("help", client, [ownerOrAdmin, prefix]);
  return message.channel.send(embed);
};