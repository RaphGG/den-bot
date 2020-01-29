const botspeech = require("../modules/botspeech.js");

exports.run = (client, message) => {
  let settings = client.settings.get(message.guild.id);

  if (settings)
  {
    let isAdmin = message.member.roles.some(role => {
      return settings.roles.adminroles.includes(role.id);
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
      adminroles.push(role.id);
  });

  const defaultSettings = {
    prefix:"%",
    roles:{
      owner:owner.toString(),
      adminroles:adminroles,
      pingroles:pingroles
    },
    denOnly:false
  }

  client.settings.set(message.guild.id, defaultSettings);
  return client.settings.get(message.guild.id);
}