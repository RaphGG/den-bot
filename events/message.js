const defaultSettings = require("../commands/resetconf.js");

module.exports = (client, message) => {
  if (!message.guild || message.author.bot) return;

  let guildConf = client.settings.get(message.guild.id);
  if (!guildConf) 
    guildConf = defaultSettings.run(client, message);

  if (message.content.indexOf(guildConf.prefix) !== 0) return;

  const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) return;

  cmd.run(client, message, args);
};