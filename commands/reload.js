module.exports = {
  name: "Bot Owner Reload Command",
  cmdName: "reload",
  aliases: [],
  description: "Reloads cached modules. Useful for dev work without killing node process.",
  args: 1,
  usage: "{{prefix}}reload (Command)",
  example: "{{prefix}}reload pokedex",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args) {
    run(client, message, args);
  }
};

const botspeech = require("../modules/botspeech.js");

// Reload Command Handler: Reloads require caches / map entries
// for a given command. Useful for dev work without restarting node process.
// Bot Owner only command.
const run = (client, message, args) => {

  // isBotOwner
  if (!(message.author.id == client.config.owner))
  {
    message.reply(botspeech.permNotFound)
      .then()
      .catch(console.error);
    return;
  }

  const commandName = args[0];

  // Check if the command exists and is valid
  if (!client.commands.has(commandName))
  {
    message.reply(botspeech.cmdNotFound)
      .then()
      .catch(console.error);
    return;
  }

  else
  {
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded.`)
      .then()
      .catch(console.error);
  }
};