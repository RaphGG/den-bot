exports.run = (client, message, args) => {
  if (args.length == 0 || (args[0] < 1 || args[0] > 93))
  {
    message.reply("Please enter a den number within the range of 1-93.");
    message.delete();
    return;
  }

  message.reply(`Den ${args[0]} has the following pokemon: `, {files: [`./dens/den${args[0]}.png`]});
  message.delete();
}