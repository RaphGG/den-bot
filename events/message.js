const defaultSettings = require("../commands/resetconf.js");

module.exports = (client, message) => {
  if (!message.guild || message.author.bot) return;

  const guild = client.guilds.get(message.guild.id);
  if (!guild.available) return console.error(`Guild Not Available.`);

  let settings = client.settings.get(guild.id);
  if (!settings)
    settings = defaultSettings.run(client, message);

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const ownerOrAdmin = guild.fetchMember(message.author)
    .then(member => {
      const isAO = member.hasPermission(0x00000008, false, null, true);
      const isAdmin = settings.roles.adminroles.some(role => (member.roles.get(role)));

      return isAO || isAdmin;
    })
    .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));

  if (settings.restrictedchannels.length > 0)
  {
    const restrictedchannel = settings.restrictedchannels.find(channel => (channel.id == message.channel.id));

    if (!restrictedchannel && !ownerOrAdmin)
      return;
  }

  const args = message.content.slice(settings.prefix.length).trim().split(/ /g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) return;

  cmd.run(client, message, args);
};