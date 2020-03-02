module.exports = {
  name: "Help Command",
  cmdName: "help",
  aliases: [],
  description: "Delivers a handy help message with a table of commands.",
  args: false,
  usage: "{{prefix}}help (Command)",
  example: "{{prefix}}help\n{{prefix}}help catch",
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
    message.channel.send(embed)
      .then()
      .catch(console.error);
    return;
  }

  const name = args[0].toLowerCase();
  const command = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

  if (!command)
  {
    message.channel.send(botspeech.cmdNotFound)
      .then()
      .catch(console.error);
    return;
  }

  const embed = embedHelper.createEmbed("helpcmd", client, [command, settings.prefix]);
  message.channel.send(embed)
    .then()
    .catch(console.error);
  return;
};