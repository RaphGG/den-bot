exports.run = (client, message, args) => {
  if (args.length == 0 || (args[0] < 1 || args[0] > 93))
    return message.reply("Please enter a den number within the range of 1-93.");

  else
    return message.reply(`Den ${args[0]} has the following pokemon: `, {files: [`./dens/den${args[0]}.png`]});
}

/*
if (args.length == 0 || (args[0].valueOf() > 93 || args[0].valueOf() < 1))
  return message.channel.send("Please enter a den number within the range of 1-93.");

else
  return message.reply(`Den ${args[0]} has the following Pokémon: `, {files: [`./dens/den${args[0]}.png`]});
*/
