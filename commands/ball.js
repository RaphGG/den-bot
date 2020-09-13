// I made this comment in the index.js file, but I will add it here as well for
// reference. I would create an index.js file here that can load it from outside,
// and in it place all the commands to be exported. Follow this pattern here:
// https://github.com/caquillo07/telledu_server/blob/master/controllers/index.js
//
// This will allow you to use the module system instead of having to load all
// files using the system file read calls.

module.exports = {
  name: "Poké-Ball Info Command",
  cmdName: "ball",
  aliases: ["balls"],
  description: "Shows a summary of a Poké-Ball’s statistics",
  args: 1,
  usage: "{{prefix}}ball [Poké-Ball Name]",
  example: "{{prefix}}ball beast",
  guildOnly: false,
  adminOnly: false,
  run(client, message, args) {
    run(client, message, args);
  }
};

const embedHelper = require("../modules/embedHelper.js");
const botspeech = require("../modules/botspeech.js");
const pokedata = require("../modules/pokedata.js");

const run = (client, message, args) => {

  const ball = pokedata.fetch("ball", args);
  if (!ball)
  {
    message.channel.send(botspeech.ballNotFound)
      .then()
      .catch(console.error);

    return;
  }

  const embed = embedHelper.createEmbed("ballinfo", client, ball);
  message.channel.send(embed)
    .then()
    .catch(console.error);

  return;
};