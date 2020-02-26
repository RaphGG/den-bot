module.exports = {
  name: "Invite Link",
  cmdName: "invite",
  aliases: ["link"],
  description: "Delivers an Alcremie-B invite link to allow Alcremie-B to join your server.",
  args: false,
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message);
  }
};

const embedHelper = require("../modules/embedHelper.js");

const run = (client, message) => {
  const embed = embedHelper.createEmbed("invite", client);
  return message.channel.send(embed);
};