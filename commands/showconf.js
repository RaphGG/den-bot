const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);

  let isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {
      return adminrole.id == role.id
    });
  });

  if (!isAdmin)
    return message.reply(botspeech.permNotFound);

  let configProps = JSON.stringify(settings, null, 1);
  
  return message.channel.send(`The following are the server's current configurations:\n\`\`\`${configProps}\`\`\``);
}