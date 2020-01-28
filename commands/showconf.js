const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);
  if (!settings)
    return message.channel.send(botspeech.guildConfNotFound);

  let configProps = JSON.stringify(settings);
  
  return message.channel.send(`The following are the server's current configurations:\n\`\`\`${configProps}\`\`\``);
}