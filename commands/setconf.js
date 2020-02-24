exports = {
  name: "Set Guild Configuration",
  cmdName: "setconf",
  aliases: ["set"],
  description: "Sets a server specific bot configuration setting to given value(s).",
  args: true,
  example: "{{prefix}}setconf",
  guildOnly: true,
  run: run(),
};

const botspeech = require("../modules/botspeech.js");
const fs = require("fs");


const run = (client, message, args) => {
  const guild = client.guilds.get(message.guild.id);
  if (!guild.available) return console.error(`Guild Not Available.`);

  const settings = client.settings.get(message.guild.id);

  const ownerOrAdmin = guild.fetchMember(message.author)
    .then(member => {
      const isAO = member.hasPermission(0x00000008, false, null, true);
      const isAdmin = settings.roles.adminroles.some(role => (member.roles.get(role)));

      return isAO || isAdmin;
    })
    .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));

  if (!ownerOrAdmin)
    return message.reply(botspeech.permNotFound);

  const [prop, ...value] = args;
  const values = value.join(" ").split(/, |,/g);

  const isAlpha = value.join("").match(/[A-Za-z0-9]/gi);

  if (prop == "prefix" && isAlpha)
    return message.reply(botspeech.requiredPrefix);

  if (prop == "adminroles")
  {
    const addedRoles = [];
    values.forEach(rolename => {

      const guildrole = guild.roles.find(role => (role.name.toLowerCase() == rolename.toLowerCase()));

      if (!guildrole) return;

      const adminrole = {
        name: guildrole.name,
        id: guildrole.id
      };

      if (settings.roles.adminroles.some(role => (role.id == adminrole.id)))
        return;

      settings.roles.adminroles.push(adminrole);
      addedRoles.push(adminrole.name);
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

  if (prop == "restrictedchannels")
  {
    const addedChannels = [];
    values.forEach(name => {

      const guildchan = guild.channels.find(channel => (channel.name.toLowerCase() == name.toLowerCase() && channel.type == "text"));

      if (!guildchan) return;

      const rchan = {
        name: guildchan.name,
        id: guildchan.id
      };

      if (settings.restrictedchannels.some(chan => (chan.id == rchan.id)))
        return;

      settings.restrictedchannels.push(rchan);
      addedChannels.push(rchan.name);
    });

    if (addedChannels.length == 0)
      return message.channel.send(botspeech.noChannelsAdded);

    try
    {
      fs.writeFileSync(`./data/settings/${message.guild.id}.json`, JSON.stringify(settings));
    }
    catch(error)
    {
      console.error(error);
    }

    return message.channel.send(botspeech.addChannels.replace(/{{channels}}/g, addedChannels.join(", ")));
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

// Set Guild Specific Configurations Command Handler:
// Allows server admins / owner to set guild specific
// settings for the bot to utilize. Those being shiny
// sprites only, admin-roles, ping-roles, etc.