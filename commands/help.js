module.exports = {
  name: "Help Command",
  cmdName: "help",
  description: "Delivers a handy help message with a table of commands.",
  args: false,
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};
const embedHelper = require("../modules/embedHelper.js");
const botspeech = require("../modules/botspeech.js");

// Help Command Handler: Delivers bot's help message
// depending on the type of user that requested it (Non-Admin / Admin).
const run = (client, message, args, settings) => {
  if (!args.length)
  {
    const embed = embedHelper.createEmbed("help", client, settings.prefix);
    return message.channel.send(embed);
  }

  const name = args[0].toLowerCase();
  const command = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

  if (!command)
    return message.channel.send(botspeech.cmdNotFound);


  const embed = embedHelper.createEmbed("helpcmd", client, command);

  return message.channel.send(embed);

};