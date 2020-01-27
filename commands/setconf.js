const botspeech = require("../modules/botspeech.js");

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);
  if (!settings)
    return message.reply(botspeech.guildConfNotFound);

  let isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.includes(role.id);
  });

  if (!isAdmin)
    return message.reply(botspeech.permNotFound);

  if (!args || args.length < 2)
    return message.reply(botspeech.setconfNoArg);

  const [prop, ...value] = args;
  let roles = value.join("").split(/,/g);
  console.log(roles);

  let isAlpha = value.join("").match(/[A-Za-z0-9]/gi);

  if (prop == "prefix" && isAlpha)
    return message.reply(botspeech.requiredPrefix);

  if (prop == "adminroles")
  {
    for (var rolename in roles)
    {
      let role = message.guild.roles.find(role => {
        role.name.toLowerCase().replace(/ /g, "") == rolename;
      });

      if (!role)
        continue;

      settings[prop].adminroles.push(role.id);
    }
  }

  settings[prop] = value.join(" ");

  return message.channel.send(`Guild configuration item ${prop} has been set to: \n\`${value.join(" ")}\``);
}