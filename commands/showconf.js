module.exports = {
  name: "Show Guild Configuration",
  cmdName: "showconf",
  aliases: ["show"],
  description: "Shows the bot's active configuration settings for this server in JSON",
  args: false,
  guildOnly: true,
  adminOnly: true,
  run(client, message, args, settings) {
    run(message, settings);
  }
};

const run = (message, settings) => {

  const configProps = JSON.stringify(settings, null, 1);

  return message.channel.send(`The following are the server's current configurations:\n\`\`\`json\n${configProps}\`\`\``);
};