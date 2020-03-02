module.exports = {
  name: "Reset Guild Configuration Command",
  cmdName: "resetconf",
  aliases: ["reset"],
  description: "Resets the bot's active configuration settings for this server to default values.",
  args: false,
  usage: "{{prefix}}resetconf",
  example: "{{prefix}}resetconf",
  guildOnly: true,
  adminOnly: true,
  run(client, message) {
    run(client, message);
  }
};

const botspeech = require("../modules/botspeech.js");
const fs = require("fs");

// Reset Guild Specific Configurations Command Handler:
const run = (client, message) => {
  client.settings.delete(message.guild.id);

  // Set defaults in settings map & try to save to file.
  const defaultSettings = {
    prefix:"%",
    denpkmnonly:false,
    shinypkmnonly:false,
    restrictedchannels:[],
  };

  client.settings.set(message.guild.id, defaultSettings);
  try
  {
    fs.writeFileSync(`./data/settings/${message.guild.id}.json`, JSON.stringify(defaultSettings));
  }
  catch(error)
  {
    console.error(error);
  }

  message.channel.send(botspeech.configReset)
    .then()
    .catch(console.error);
  return;

};