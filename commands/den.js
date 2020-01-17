const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  if (!args || args.length < 1 || (args[0] < 1 || args[0] > 93))
    return message.reply(botspeech.denNoArg);

  else
    return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./data/dens/den${args[0]}.png`]});
};

/*
const botspeech = require("../modules/botspeech.js");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let denEmbed = new Discord.RichEmbed();
  denEmbed.setFooter("Alcremie-B, by Droopy", client.user.avatarURL);
  denEmbed.setTitle("Den Finder");

  if (args.length == 0 || (args[0] < 1 || args[0] > 93))
    return message.reply(botspeech.denNoArg);

  else
  {
    denEmbed.setDescription(`Den ${args[0]} has the following Pokémon:`);
    denEmbed.file = `./data/dens/den${args[0]}.png`;

    return message.channel.send(denEmbed);

  }
    //return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./data/dens/den${args[0]}.png`]});
};
*/