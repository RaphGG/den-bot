const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  let guildMember = message.member;
  if (!guildMember)
    return message.channel.send(botspeech.guildNotFound);
  
  let isAdmin = message.member.roles.some(role => {
    return botspeech.adminRoles.includes(role.name);
  });

  if (!isAdmin)
    return message.reply(botspeech.permNotFound);

  else if (!args || args.length < 1)
    return message.channel.send(botspeech.pingNoArg);

  else
  {
    let findRole = args[0].toLowerCase();

    let rolePing = message.guild.roles.find(role => {
      return role.name.toLowerCase().startsWith(findRole);
    });

    if (!rolePing)
      return message.channel.send(botspeech.roleNotFound);

    else if (!rolePing.name.startsWith("Shiny") && !rolePing.name.startsWith("Giveaway"))
      return message.channel.send(botspeech.pingableRoles);

    else
    {
      rolePing.setMentionable(true, "Role to be pinged.");
      return message.channel.send(`${rolePing}`).then(() => {
        rolePing.setMentionable(false, "Role has been pinged.")
      });
    }
  }
}
