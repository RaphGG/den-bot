const botspeech = require("../modules/botspeech.js");
// TODO: Finish Comments.

exports.run = (client, message, args) => {
  let guildMember = message.member;
  if (!guildMember)
    return message.reply(botspeech.guildNotFound);
    
  let isOwner = message.member.id == client.config.owner;
  if (!isOwner)
    return message.reply(botspeech.permNotFound);
  
  if (!args || args.length < 1)
    return message.reply(botspeech.reloadNoArg);

  const commandName = args[0];

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
}

/*
exports.run = (client, message, args) => {
  if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!client.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`);
};
*/