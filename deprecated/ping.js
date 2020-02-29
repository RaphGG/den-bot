// OBSOLETE

const botspeech = require("../modules/botspeech.js");
// TODO: Finish Comments.

const startsOrIs = (str1, str2) => {
  return str1.toLowerCase().startsWith(str2.toLowerCase()) || str1.toLowerCase() == str2.toLowerCase();
};

exports.run = async (client, message, args) => {
  const guild = client.guilds.get(message.guild.id);
  if (!guild.available) return console.error(`Guild Not Available.`);

  const settings = client.settings.get(message.guild.id);

  const ownerOrAdmin = await guild.fetchMember(message.author)
    .then(member => {
      const isAO = member.hasPermission(0x00000008, false, null, true);
      const isAdmin = settings.roles.adminroles.some(role => (member.roles.get(role)));

      return isAO || isAdmin;
    })
    .catch(error => (console.error(`No Member Fetched.\nError: ${error}`)));

  if (!ownerOrAdmin)
    return message.reply(botspeech.permNotFound);

  else if (!args || args.length < 1)
    return message.channel.send(botspeech.pingNoArg);

  else
  {
    const pingroles = settings.roles.pingroles.map(role => (role.name)).join(", ");

    const rolename = args.join(" ");

    const pingrole = settings.roles.pingroles.find(role => (startsOrIs(role.name, rolename)));

    if (!pingrole)
      return message.channel.send(botspeech.roleNotFound.replace(`{{roles}}`, pingroles));

    const guildrole = guild.roles.get(pingrole.id);

    if (!guildrole)
      return message.channel.send(botspeech.roleNotFound.replace(`{{roles}}`, pingroles));

    guildrole.setMentionable(true, "Role to be pinged.")
      .then(updated => {
        guild.fetchMember(message.author.id)
          .then(member => (message.channel.send(`${updated} *(requested by ${member})*`)))
          .catch(error => (console.error(`Member Fetch Error: ${error}`)));

        return updated;
      })
      .then(updated => {
        setTimeout(() => {
          updated.setMentionable(false, "Role has been pinged.");
        }, 5000);
      })
      .catch(error => {
        console.error(`Role Ping Error: ${error}\nGuild ID: ${guild.id}`);
        if (error.message == "Missing Permissions")
          return message.channel.send(botspeech.rolePlacement.replace(/{{role}}/gi, guildrole.name));

        else
          return message.channel.send(botspeech.pingError);
      });
  }
};
