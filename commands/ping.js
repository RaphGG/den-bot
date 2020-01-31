const botspeech = require("../modules/botspeech.js");
// TODO: Finish Comments.

exports.run = (client, message, args) => {
  let settings = client.settings.get(message.guild.id);
  
  let isAdmin = message.member.roles.some(role => {
    return settings.roles.adminroles.find(adminrole => {
      return adminrole.id == role.id
    });
  });

  if (!isAdmin)
    return message.reply(botspeech.permNotFound);

  else if (!args || args.length < 1)
    return message.channel.send(botspeech.pingNoArg);

  else
  {
    let findRole = args[0].toLowerCase();

    let rolePing = message.guild.roles.find(role => {
      return role.name.toLowerCase().startsWith(findRole) && (settings.roles.pingroles.find(pingrole => {return pingrole.id == role.id}));
    });

    if (!rolePing)
    {
      let pingroles = [];
      settings.roles.pingroles.forEach(role => {pingroles.push(role.name)});

      let roles = pingroles.join(", ");
      return message.channel.send(botspeech.roleNotFound.replace(`{{roles}}`, roles));
    }

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
