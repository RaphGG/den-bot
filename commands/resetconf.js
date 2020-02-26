const botspeech = require("../modules/botspeech.js");
const fs = require("fs");

// Reset Guild Specific Configurations Command Handler:
exports.run = async (client, message) => {
  const guild = client.guilds.get(message.guild.id);
  if (!guild.available) return console.error(`Guild Not Available.`);

  const settings = client.settings.get(message.guild.id);

  // If settings already exist, delete them from settings
  // map and revert them to default. Otherwise set brand
  // new settings.
  if (settings)
  {
    const ownerOrAdmin = await guild.fetchMember(message.author)
      .then(member => {
        const isAO = member.hasPermission(0x00000008, false, null, true);
        const isAdmin = settings.roles.adminroles.some(role => (member.roles.get(role)));

        return isAO || isAdmin;
      })
      .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));

    if (!ownerOrAdmin)
      return message.reply(botspeech.permNotFound);

    client.settings.delete(message.guild.id);
    message.channel.send(botspeech.configReset);
  }

  const adminroles = [];
  const pingroles = [];
  const restrictedchannels = [];

  // Search for server admin roles.
  guild.roles.tap((role, id) => {
    if (role.hasPermission(0x00000008))
    {
      const adminrole = {
        name: role.name,
        id: id
      };
      adminroles.push(adminrole);
    }
  });

  const defaultSettings = {
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
  client.settings.set(guild.id, defaultSettings);
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