const botspeech = require("../modules/botspeech.js");
// TODO: Finish Comments.

exports.run = (client, message, args) => {
  // TEST SETUP
  let pokeraidRoles = client.config.denbot.roles;
  let guildMember = message.member;
  if (!guildMember)
    return message.channel.send(botspeech.guildNotFound);
  
  let isAdmin = message.member.roles.some(role => {
    return pokeraidRoles.adminroles.includes(role.id);
  });

  if (!isAdmin)
    return message.reply(botspeech.permNotFound);

  else if (!args || args.length < 1)
    return message.channel.send(botspeech.pingNoArg);

  else
  {
    let findRole = args[0].toLowerCase();

    let rolePing = message.guild.roles.find(role => {
      return role.name.toLowerCase().startsWith(findRole) && (pokeraidRoles.pingableroles.includes(role.id));
    });

    if (!rolePing)
      return message.channel.send(botspeech.roleNotFound);

    else
    {
      rolePing.setMentionable(true, "Role to be pinged.")
        .then(updated => {
          message.channel.send(`${updated}`);
          return updated;
        })
        .then(updated => {
          setTimeout(() => {
            updated.setMentionable(false, "Role has been pinged.")
          }, 5000);
        })
        .catch(err => console.log(err));
    }
  }
}
