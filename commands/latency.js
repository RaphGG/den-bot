module.exports = {
  name: "Latency Command",
  cmdName: "latency",
  aliases: ["ping"],
  description: "Reports the bot's average heartbeat latency and message response time.",
  args: false,
  usage: "{{prefix}}latency",
  example: "{{prefix}}latency",
  guildOnly: false,
  adminOnly: false,
  cooldown: 10,
  run(client, message) {
    run(client, message);
  }
};

const botspeech = require("../modules/botspeech.js");

const run = (client, message) => {
  // This will round the response time between when the message was received and when the message was sent
  if (!(message.author.id == client.config.owner))
  {
    message.reply(botspeech.permNotFound)
      .then()
      .catch(console.error);
    return;
  }

  const responseTime = Math.round(Date.now() - message.createdTimestamp);

  message.channel.send(`Last Ready: \`${client.readyAt}ms\`\nResponse Time: \`${responseTime}ms\``)
    .then()
    .catch(console.error);
};