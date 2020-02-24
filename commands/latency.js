exports = {
  name: "Bot API Latency",
  cmdName: "latency",
  aliases: ["ping"],
  description: "Reports the bot's average ping latency and message response time.",
  args: false,
  guildOnly: false,
  cooldown: 10,
  run: run(),
};

const run = (client, message) => {
  // This will round the api ping of the client
  const apiPing = Math.round(client.ping);

  // This will round the response time between when the message was received and when the message was sent
  const responseTime = Math.round(Date.now() - message.createdTimestamp);

  message.channel.send(`API Ping: \`${apiPing}ms\`\nResponse Time: \`${responseTime}ms\``);
};