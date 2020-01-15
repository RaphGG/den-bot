const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  if (args.length == 0 || (args[0] < 1 || args[0] > 93))
    return message.reply(botspeech.denFail);

  else
    return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./dens/den${args[0]}.png`]});
};
