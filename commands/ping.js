/*
else if (command === "ping")
{
  let isAdmin = message.member.roles.some(role => {
    return adminRoles.includes(role.name);
  });

  if (!isAdmin)
    return message.reply(permNotFound);

  else if (args.length == 0)
    return message.channel.send(enterPing);

  else
  {
    let findRole = args[0].toLowerCase();

    let rolePing = message.guild.roles.find(role => {
      return role.name.toLowerCase().startsWith(findRole);
    });

    if (!rolePing)
      return message.channel.send(roleNotFound);

    else if (!rolePing.name.startsWith("Shiny") && !rolePing.name.startsWith("Giveaway"))
      return message.channel.send(pingableRoles);

    else
    {
      rolePing.setMentionable(true, "Role to be pinged.");
      return message.channel.send(`${rolePing}`).then(() => {
        rolePing.setMentionable(false, "Role has been pinged.")
      });
    }
  }
}
*/