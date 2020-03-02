module.exports = {
  name: "Show Guild Configuration Command",
  cmdName: "showconf",
  aliases: ["show"],
  description: "Shows the bot's active configuration settings for this server in JSON",
  args: false,
  usage: "{{prefix}}showconf",
  example: "{{prefix}}showconf",
  guildOnly: true,
  adminOnly: true,
  run(client, message, args, settings) {
    run(message, settings);
  }
};

const run = (message, settings) => {

  const configProps = JSON.stringify(settings, null, 1);

  message.channel.send(`The following are the server's current configurations:\n\`\`\`json\n${configProps}\`\`\``)
    .then()
    .catch(console.error);
  return;
};