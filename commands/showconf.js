const botspeech = require("../modules/botspeech.js");

// Show Configuration Settings Command Handler:
// Displays bot's current configuration settings in a
// JSON format.
exports.run = (client, message) => {
  const settings = client.settings.get(message.guild.id);

  const isOwner = message.member.id == settings.ownerID;

  const isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {
      return adminrole.id == role.id;
    });
  });

  if (!isAdmin && !isOwner)
    return message.reply(botspeech.permNotFound);

  const configProps = JSON.stringify(settings, null, 1);

  return message.channel.send(`The following are the server's current configurations:\n\`\`\`${configProps}\`\`\``);
};