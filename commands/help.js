exports = {
  name: "Help Command",
  cmdName: "help",
  description: "Delivers a dynamic RichEmbed with a help message on a given command.",
  args: false,
  guildOnly: false,
  run: run(),
};
const embedHelper = require("../modules/embedHelper.js");

// Help Command Handler: Delivers bot's help message
// depending on the type of user that requested it (Non-Admin / Admin).
const run = (client, message) => {
  const guild = client.guilds.get(message.guild.id);
  if (!guild.available) return console.error(`Guild Not Available.`);

  const settings = client.settings.get(message.guild.id);

  // Settings retrieval & Permissions check for corresponding
  // help embed.
  const ownerOrAdmin = guild.fetchMember(message.author)
    .then(member => {
      const isAO = member.hasPermission(0x00000008, false, null, true);
      const isAdmin = settings.roles.adminroles.some(role => (member.roles.get(role)));

      return isAO || isAdmin;
    })
    .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));

  const prefix = settings.prefix;
  const embed = embedHelper.createEmbed("help", client, [ownerOrAdmin, prefix]);
  return message.channel.send(embed);
};