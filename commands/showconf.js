exports = {
  name: "Show Guild Configuration",
  cmdName: "showconf",
  aliases: ["show"],
  description: "Shows the bot's active configuration settings for this server in JSON",
  args: false,
  guildOnly: true,
  run: run(),
};

const botspeech = require("../modules/botspeech.js");

const run = (client, message) => {
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

  return message.channel.send(`The following are the server's current configurations:\n\`\`\`json\n${configProps}\`\`\``);
};