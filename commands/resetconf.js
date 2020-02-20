const botspeech = require("../modules/botspeech.js");
const fs = require("fs");

// Reset Guild Specific Configurations Command Handler:
exports.run = (client, message) => {
  const settings = client.settings.get(message.guild.id);

  // If settings already exist, delete them from settings
  // map and revert them to default. Otherwise set brand
  // new settings.
  if (settings)
  {
    const isAdmin = message.member.roles.some(role => {
      return settings.roles.adminroles.find(adminrole => {
        return adminrole.id == role.id;
      });
    });

    const isOwner = message.member.id == settings.ownerID;

    if (!isAdmin && !isOwner)
      return message.reply(botspeech.permNotFound);

    client.settings.delete(message.guild.id);
    message.channel.send(botspeech.configReset);
  }

  const adminroles = [];
  const pingroles = [];
  const restrictedchannels = [];

  // Search for server admin roles.
  message.guild.roles.forEach(role => {
    if (role.hasPermission(0x00000008))
    {
      const x = {
        name: role.name,
        id: role.id
      };
      adminroles.push(x);
    }
  });

  const defaultSettings = {
    ownerID: message.guild.ownerID,
    prefix:"%",
    denpkmnonly:false,
    shinypkmnonly:false,
    restrictedchannels:restrictedchannels,
    roles:{
      adminroles:adminroles,
      pingroles:pingroles
    }
  };

  // Set defaults in settings map & try to save to file.
  client.settings.set(message.guild.id, defaultSettings);
  try
  {
    fs.writeFileSync(`./data/settings/${message.guild.id}.json`, JSON.stringify(defaultSettings));
  }
  catch(error)
  {
    console.error(error);
  }
  return client.settings.get(message.guild.id);
};