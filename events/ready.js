const botspeech = require("../modules/botspeech.js");
const DBL = require("dblapi.js");


module.exports = (client) => {
  const dbl = new DBL(client.config.tokenDBL, client);
  dbl.on("posted", () => (console.log("Server count posted!")));

  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
  ];

  let num = -1;
  setPresence(client, 0);
  setInterval(() => {
    Promise.all(promises)
      .then(results => {
        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
        const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        setPresence(client, totalGuilds, totalMembers, ++num%3);
      })
      .catch(console.error);
  }, 120 * 1000);

  dbl.postStats(client.guilds.size);
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800 * 1000);

  return console.log("I am ready!");
};

const setPresence = async (client, totalGuilds, totalMembers, num) => {

  switch (num)
  {
    case 0:
      await client.user.setActivity(botspeech.presenceSmiles.replace(/{{count}}/, totalGuilds), { type:"PLAYING" })
        .then()
        .catch(console.error);
      return;
    case 1:
      await client.user.setActivity(botspeech.presenceUsers.replace(/{{count}}/, totalMembers), { type:"PLAYING" })
        .then()
        .catch(console.error);
      return;
    case 2:
      await client.user.setActivity(botspeech.presenceInvite, { type:"LISTENING" })
        .then()
        .catch(console.error);
      return;
  }
};