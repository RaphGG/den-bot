const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);

  let isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {return adminrole.id == role.id});
  });

  let isOwner = message.member.id == settings.ownerID;

  if (!isAdmin && !isOwner)
    return message.reply(botspeech.permNotFound);

  if (!args || args.length < 2)
    return message.reply(botspeech.setconfNoArg);

  const [prop, ...value] = args;
  let roles = value.join(" ").split(/, |,/g);

  let isAlpha = value.join("").match(/[A-Za-z0-9]/gi);

  if (prop == "ownerID")
    return message.reply(botspeech.configNoChange);

  if (prop == "prefix" && isAlpha)
    return message.reply(botspeech.requiredPrefix);

  if (prop == "adminroles")
  {
    let addedRoles = [];
    roles.forEach(rolename => {
      let role = message.guild.roles.find(role => {
        return role.name.toLowerCase() == rolename.toLowerCase();
      });
      
      if (!role)
        return;

      let x = {
        name: role.name,
        id: role.id
      }

      let prexistingRoles = settings.roles.adminroles.filter(role => (role.id === x.id));

      if (prexistingRoles.length >= 1)
        return;

      settings.roles.adminroles.push(x);
      addedRoles.push(role.name);
    });

    if (addedRoles.length == 0)
      return message.channel.send(botspeech.noRolesAdded);

    return message.channel.send(botspeech.addAdminRoles.replace(/{{roles}}/g, addedRoles.join(", ")));
  }

  if (prop == "pingroles")
  {
    let addedRoles = [];
    roles.forEach(rolename => {
      let role = message.guild.roles.find(role => {
        return role.name.toLowerCase() == rolename.toLowerCase();
      });
      
      if (!role)
        return;

      let x = {
        name: role.name,
        id: role.id
      }

      let prexistingRoles = settings.roles.pingroles.filter(role => (role.id === x.id));

      if (prexistingRoles.length >= 1)
        return;

      settings.roles.pingroles.push(x);
      addedRoles.push(role.name);
    });

    if (addedRoles.length == 0)
      return message.channel.send(botspeech.noRolesAdded);

    return message.channel.send(botspeech.addPingRoles.replace(/{{roles}}/g, addedRoles.join(", ")));
  }

  if (typeof settings[prop] == 'undefined')
    return message.channel.send(botspeech.guildConfNotFound);

  settings[prop] = value.join(" ");

  return message.channel.send(`Guild configuration item ${prop} has been set to: \n\`${value.join(" ")}\``);
}