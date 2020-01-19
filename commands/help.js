const botspeech = require("../modules/botspeech.js");
const Discord = require("discord.js");

exports.run = (client, message) => {
  let guildMember = message.member;
  let helpEmbed = new Discord.RichEmbed();
  helpEmbed.setAuthor(client.user.username, client.user.avatarURL);
  helpEmbed.setColor(14315906);
  helpEmbed.setFooter(botspeech.footerCred, client.user.avatarURL);
  helpEmbed.setTimestamp();
  helpEmbed.setTitle("All Bot Commands:");
  helpEmbed.setDescription(botspeech.commandDescription);
  helpEmbed.addField("Pokémon Commands:", botspeech.pokeCommands);

  if (!guildMember)
    return message.channel.send(helpEmbed);

  let isAdmin = message.member.roles.some(role => {
    return botspeech.adminRoles.includes(role.name);
  });

  if (isAdmin)
  {
    helpEmbed.addField("User Commands:", botspeech.adminCommands);
    return message.channel.send(helpEmbed);
  }
  
  else
  {
    helpEmbed.addField("User Commands:", botspeech.nonAdminCommands);
    return message.channel.send(helpEmbed);
  }
}