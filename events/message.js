const botspeech = require("../modules/botspeech.js");
const fs = require("fs");
const Discord = require("discord.js");
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
  if (message.author.bot) return;

  let settings;
  let ownerOrAdmin;
  if (message.channel.type == 'dm')
    settings = client.config.settings;

  else
  {
    const guild = client.guilds.get(message.guild.id);
    if (!guild.available)
      return console.error(`Guild Not Available.\nGuild ID: ${guild.id}`);

    settings = client.settings.get(guild.id);
    if (!settings) settings = setDefault(client, guild.id);

    if (!message.content.startsWith(settings.prefix)) return;

    ownerOrAdmin = await isOwnerOrAdmin(message.author, guild, settings);
  }

  if (!message.content.startsWith(settings.prefix)) return;

  if (settings.restrictedchannels.length > 0)
  {
    const restrictedchannel = settings.restrictedchannels
      .find(channel => (channel.id == message.channel.id));

    if (!restrictedchannel && !ownerOrAdmin) return;
  }

  const args = message.content.slice(settings.prefix.length).trim().split(/ /g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type != "text")
    return message.channel.send(botspeech.guildOnlyCmd);

  if (command.adminOnly && !ownerOrAdmin)
    return message.channel.send(botspeech.permNotFound);

  if (!cooldowns.has(command.cmdName))
    cooldowns.set(command.cmdName, new Discord.Collection());

  const now = Date.now();
  const timestamps = cooldowns.get(command.cmdName);
  const cooldownAmt = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id))
  {
    const expTime = timestamps.get(message.author.id) + cooldownAmt;

    if (now < expTime)
    {
      const timeLeft = (expTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before re-using the \`${command.cmdName}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmt);

  try
  {
    command.run(client, message, args, settings);
  }
  catch (error)
  {
    console.error(`Command failed to execute.\nError: ${error}`);
  }


  /*

  if (message.channel.type == 'dm')
  {
    if (!message.content.startsWith('%')) return;
    // console.log(`Inside a dm with message: ${message.content}`);
    const args = message.content.slice(1).trim().split(/ /g);
    const commandName = args.shift().toLowerCase();
    // console.log(`Inside a dm with commandName: ${commandName}`);

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // console.log(`Inside a dm with command: ${command}`);

    if (!command || command.guildOnly) return;

    if (command.args && (!args.length || args.length < command.args))
      return message.channel.send(botspeech[`${command.cmdName}NoArg`]);

    if (!cooldowns.has(command.cmdName))
      cooldowns.set(command.cmdName, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.cmdName);
    const cooldownAmt = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id))
    {
      const expTime = timestamps.get(message.author.id) + cooldownAmt;

      if (now < expTime)
      {
        const timeLeft = (expTime - now) / 1000;
        return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.cmdName}\` command`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmt);

    try
    {
      command.run(client, message, args, client.config.settings);
    }
    catch (error)
    {
      console.error(`Command failed to execute.\nError: ${error}`);
    }
  }

  else if (message.channel.type == 'text')
  {
    const guild = client.guilds.get(message.guild.id);
    if (!guild.available)
      return console.error(`Guild Not Available.\nGuild ID: ${guild.id}`);

    let settings = client.settings.get(guild.id);
    if (!settings)
      settings = setDefault(client, guild.id);

    if (!message.content.startsWith(settings.prefix)) return;

    const ownerOrAdmin = await isOwnerOrAdmin(message.author, guild, settings);

    if (settings.restrictedchannels.length > 0)
    {
      const restrictedchannel = settings.restrictedchannels.find(channel => (channel.id == message.channel.id));

      if (!restrictedchannel && !ownerOrAdmin) return;
    }

    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ /g);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command || (command.adminOnly && !ownerOrAdmin)) return;

    if (command.args && (!args.length || args.length < command.args))
      return message.channel.send(botspeech[`${command.cmdName}NoArg`]);

    // console.log(settings);

    if (!cooldowns.has(command.cmdName))
      cooldowns.set(command.cmdName, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.cmdName);
    const cooldownAmt = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id))
    {
      const expTime = timestamps.get(message.author.id) + cooldownAmt;

      if (now < expTime)
      {
        const timeLeft = (expTime - now) / 1000;
        return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.cmdName}\` command`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmt);

    try
    {
      command.run(client, message, args, settings);
    }
    catch (error)
    {
      console.error(`Command failed to execute.\nError: ${error}`);
    }
  }
  */
};

const isOwnerOrAdmin = async (author, guild) => {
  return guild.fetchMember(author)
    .then(member => (member.hasPermission(0x00000008, false, null, true)))
    .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));
};

const setDefault = (client, guildId) => {
  const defaultSettings = {
    prefix:"%",
    denpkmnonly:false,
    shinypkmnonly:false,
    restrictedchannels:[],
  };

  client.settings.set(guildId, defaultSettings);

  try
  {
    fs.writeFileSync(`./data/settings/${guildId}.json`, JSON.stringify(defaultSettings));
  }
  catch (error)
  {
    console.error(`Failed to write guild settings.\nError: ${error}\nGuild ID: ${guildId}`);
  }

  return client.settings.get(guildId);
};