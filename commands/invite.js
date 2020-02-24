exports = {
  name: "Invite Link",
  cmdName: "invite",
  aliases: ["link"],
  description: "Delivers a RichEmbed with a link to invite Alcremie-B to any server.",
  args: false,
  guildOnly: false,
  run: run(),
};

const embedHelper = require("../modules/embedHelper.js");
const run = (client, message) => {
  const embed = embedHelper.createEmbed("invite", client);
  return message.channel.send(embed);
};