const botspeech = require("../modules/botspeech.js");

exports.run = (client, message) => {
  let settings = client.settings.get(message.guild.id);

  if (settings)
  {
    let isAdmin = message.member.roles.some(role => {
      return settings.roles.adminroles.find(adminrole => {
        return adminrole.id == role.id
      });
    });

    if (!isAdmin)
      return message.reply(botspeech.permNotFound);

    client.settings.delete(message.guild.id);
  }
  
  const owner = message.guild.ownerID
  const adminroles = [];
  const pingroles = [];

  message.guild.roles.forEach(role => {
    if (role.hasPermission(0x00000008))
    {
      let x = {
        name: role.name,
        id: role.id
      }
      adminroles.push(x);
    }
  });

  const defaultSettings = {
    prefix:"%",
    roles:{
      adminroles:adminroles,
      pingroles:pingroles
    },
    denpkmnonly:false,
    shinypkmnonly:false
  }

  client.settings.set(message.guild.id, defaultSettings);
  return client.settings.get(message.guild.id);
}