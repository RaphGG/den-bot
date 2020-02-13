const botspeech = require("../modules/botspeech.js");

module.exports = (client) => {

  client.user.setActivity(botspeech.presence.replace(/{{guildcount}}/, client.guilds.size));

  client.guilds.forEach(guild => (console.log(guild.name)));
  
  return console.log("I am ready!");
};