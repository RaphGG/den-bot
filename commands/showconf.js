const botspeech = require("../modules/botspeech.js");

// Show Configuration Settings Command Handler:
// Displays bot's current configuration settings in a
// JSON format.
exports.run = (client, message) => {
  const guild = client.guilds.get(message.guild.id);
  if (!guild.available) return console.error(`Guild Not Available.`);

  const settings = client.settings.get(message.guild.id);

  const ownerOrAdmin = guild.fetchMember(message.author)
    .then(member => {
      const isAO = member.hasPermission(0x00000008, false, null, true);
      const isAdmin = settings.roles.adminroles.some(role => (member.roles.get(role)));

      return isAO || isAdmin;
    })
    .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));

  if (!ownerOrAdmin)
    return message.reply(botspeech.permNotFound);

  const configProps = JSON.stringify(settings, null, 1);

  return message.channel.send(`The following are the server's current configurations:\n\`\`\`${configProps}\`\`\``);
};