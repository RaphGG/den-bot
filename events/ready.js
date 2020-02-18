const botspeech = require("../modules/botspeech.js");

module.exports = (client) => {

  client.user.setActivity(botspeech.presence.replace(/{{guildcount}}/, client.guilds.size));

  return console.log("I am ready!");
};