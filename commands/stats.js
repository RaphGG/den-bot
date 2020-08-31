module.exports = {
  name: "Bot Owner Stats Command",
  cmdName: "stats",
  aliases: ['stat'],
  description: "Sends a general message on the bot's statistics.",
  args: 0,
  usage: "{{prefix}}stats",
  example: "{{prefix}}stats",
  guildOnly: false,
  adminOnly: false,
  devOnly: true,
  run(client, message) {
    run(client, message);
  }
};

// const botspeech = require("../modules/botspeech.js");

// Stats Command Handler: This is a developer only command that
// uses an array of promises to fetch client shard information.
const run = (client, message) => {

  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
  ];

  Promise.all(promises)
  .then(results => {
    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
    const shardCount = client.shard.count;
    return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}\nShard Count: ${shardCount}\nLast Ready: \`${client.readyAt}ms\``);
  })
  .catch(console.error);

};