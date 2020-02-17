const embedHelper = require("../modules/embedHelper.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");

exports.run = (client, message, args) => {
  // const settings = client.settings.get(message.guild.id);

  if (!args || args.length < 1)
    return message.channel.send(botspeech.ballNoArg);

  const ball = pokedata.fetch("ball", args);

  const embed = embedHelper.createEmbed("ballinfo", client, ball);

  return message.channel.send(embed);
};