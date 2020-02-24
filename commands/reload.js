exports = {
  name: "Bot Owner Reload Function",
  cmdName: "reload",
  description: "Reloads cached modules. Useful for dev work without killing node process.",
  args: true,
  guildOnly: false,
  run: run(),
};

const botspeech = require("../modules/botspeech.js");

// Reload Command Handler: Reloads require caches / map entries
// for a given command. Useful for dev work without restarting node process.
// Bot Owner only command.
const run = (client, message, args) => {

  // isBotOwner
  if (!(message.author.id == client.config.owner))
    return message.reply(botspeech.permNotFound);

  if (!args || args.length < 1)
    return message.reply(botspeech.reloadNoArg);

  const commandName = args[0];

  // Check if the command exists and is valid
  if (!client.commands.has(commandName))
    return message.reply(botspeech.commandNotFound);

  else
  {
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded.`);
  }
};