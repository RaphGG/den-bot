module.exports = {
  name: "Pokè-Ball Info Command",
  cmdName: "ball",
  aliases: ["balls"],
  description: "Shows a summary of a Poké-Ball’s statistics",
  args: 1,
  guildOnly: false,
  adminOnly: false,
  run(client, message, args, settings) {
    run(client, message, args);
  }
};

const embedHelper = require("../modules/embedHelper.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");

const run = (client, message, args) => {

  const ball = pokedata.fetch("ball", args);
  if (!ball)
    return message.channel.send(botspeech.ballNotFound);

  const embed = embedHelper.createEmbed("ballinfo", client, ball);

  return message.channel.send(embed);
};