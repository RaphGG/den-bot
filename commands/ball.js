exports = {
  name: "Pokè-Ball Info Command",
  cmdName: "ball",
  aliases: ["balls"],
  description: "Reports the bot's average ping latency and message response time.",
  args: false,
  guildOnly: false,
  run: run(),
};


const embedHelper = require("../modules/embedHelper.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");

const run = (client, message, args) => {
  // const settings = client.settings.get(message.guild.id);

  if (!args || args.length < 1)
    return message.channel.send(botspeech.ballNoArg);

  const ball = pokedata.fetch("ball", args);
  if (!ball)
    return message.channel.send(botspeech.ballNotFound);

  const embed = embedHelper.createEmbed("ballinfo", client, ball);

  return message.channel.send(embed);
};