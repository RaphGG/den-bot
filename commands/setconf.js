module.exports = {
  name: "Set Guild Configuration Command",
  cmdName: "setconf",
  aliases: ["set"],
  description: "Sets a server specific bot configuration setting to given value(s).",
  args: 2,
  usage: "{{prefix}}setconf prefix [New Prefix]\n{{prefix}}setconf restrictedchannels [Channels]",
  example: "{{prefix}}setconf prefix $\n{{prefix}}set restrictedchannels channel-1, channel-2",
  guildOnly: true,
  adminOnly: true,
  run(client, message, args, settings) {
    run(client, message, args, settings);
  }
};

const botspeech = require("../modules/botspeech.js");
const fs = require("fs");

const run = async (client, message, args, settings) => {
  const guild = await client.guilds.resolve(message.guild);
  if (!guild.available)
    return console.error(`Guild Not Available.\nGuild ID: ${guild.id}`);

  const [prop, ...value] = args;
  const values = value.join(" ").split(/, |,/g);

  const isAlpha = value.join("").match(/[A-Za-z0-9]/gi);

  if (prop == "prefix" && isAlpha)
    return message.channel.send(botspeech.requiredPrefix);

  else if (prop == "restrictedchannels")
  {
    const addedChannels = [];
    values.forEach(name => {

      const guildchan = guild.channels.cache.find(channel => (channel.name.toLowerCase() == name.toLowerCase() && channel.type == "text"));

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

    message.channel.send(botspeech.addChannels.replace(/{{channels}}/g, addedChannels.join(", ")))
      .then()
      .catch(console.error);
    return;
  }

  else if (typeof settings[prop] == 'undefined')
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

  message.channel.send(`Guild configuration item ${prop} has been set to: \n\`${value.join(" ")}\``)
    .then()
    .catch(console.error);
  return;
};

// Set Guild Specific Configurations Command Handler:
// Allows server admins / owner to set guild specific
// settings for the bot to utilize. Those being shiny
// sprites only, restricted channels, etc.