const botspeech = require("../modules/botspeech.js");
const fs = require("fs");

// Set Guild Specific Configurations Command Handler:
// Allows server admins / owner to set guild specific
// settings for the bot to utilize. Those being shiny
// sprites only, admin-roles, ping-roles, etc.
exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);

  const isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {
      return adminrole.id == role.id;
    });
  });

  const isOwner = message.member.id == settings.ownerID;

  if (!isAdmin && !isOwner)
    return message.reply(botspeech.permNotFound);

  if (!args || args.length < 2)
    return message.reply(botspeech.setconfNoArg);

  const [prop, ...value] = args;
  const roles = value.join(" ").split(/, |,/g);

  const isAlpha = value.join("").match(/[A-Za-z0-9]/gi);

  if (prop == "ownerID" || prop == "roles")
    return message.reply(botspeech.configNoChange);

  if (prop == "prefix" && isAlpha)
    return message.reply(botspeech.requiredPrefix);

  if (prop == "adminroles")
  {
    const addedRoles = [];
    roles.forEach(rolename => {
      const role = message.guild.roles.find(role => {
        return role.name.toLowerCase() == rolename.toLowerCase();
      });

      if (!role)
        return;

      const x = {
        name: role.name,
        id: role.id
      };

      const prexistingRoles = settings.roles.adminroles.filter(role => (role.id === x.id));

      if (prexistingRoles.length >= 1)
        return;

      settings.roles.adminroles.push(x);
      addedRoles.push(role.name);
    });

    if (addedRoles.length == 0)
      return message.channel.send(botspeech.noRolesAdded);


    try
    {
      fs.writeFileSync(`./data/settings/${message.guild.id}.json`, JSON.stringify(settings));
    }
    catch(error)
    {
      console.error(error);
    }

    return message.channel.send(botspeech.addAdminRoles.replace(/{{roles}}/g, addedRoles.join(", ")));
  }

  if (prop == "pingroles")
  {
    const addedRoles = [];
    roles.forEach(rolename => {
      const role = message.guild.roles.find(role => {
        return role.name.toLowerCase() == rolename.toLowerCase();
      });

      if (!role)
        return;

      const x = {
        name: role.name,
        id: role.id
      };

      const prexistingRoles = settings.roles.pingroles.filter(role => (role.id === x.id));

      if (prexistingRoles.length >= 1)
        return;

      settings.roles.pingroles.push(x);
      addedRoles.push(role.name);
    });

    if (addedRoles.length == 0)
      return message.channel.send(botspeech.noRolesAdded);

    try
    {
      fs.writeFileSync(`./data/settings/${message.guild.id}.json`, JSON.stringify(settings));
    }
    catch(error)
    {
      console.error(error);
    }

    return message.channel.send(botspeech.addPingRoles.replace(/{{roles}}/g, addedRoles.join(", ")));
  }

  if (typeof settings[prop] == 'undefined')
    return message.channel.send(botspeech.guildConfNotFound);

  settings[prop] = value.join(" ");

  try
  {
    fs.writeFileSync(`./data/settings/${message.guild.id}.json`, JSON.stringify(settings));
  }
  catch(error)
  {
    console.error(error);
  }

  return message.channel.send(`Guild configuration item ${prop} has been set to: \n\`${value.join(" ")}\``);
};