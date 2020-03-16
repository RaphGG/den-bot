const botspeech = require("../modules/botspeech.js");
// const DBL = require("dblapi.js");

module.exports = (client) => {
  // const dbl = new DBL(client.config.tokenDBL, client);
  // dbl.on("posted", () => (console.log("Server count posted!")));

  let num = -1;
  setPresence(client, 0);
  setInterval(() => {
    setPresence(client, ++num%4);
  }, 120 * 1000);

  // dbl.postStats(client.guilds.size);
  /*
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800 * 1000);
  */
  return console.log("I am ready!");
};

const setPresence = async (client, num) => {

  /*

  if (num == 0)
  {
    client.shard.fetchClientValues('guilds.cache.size')
      .then(results => {
        results.reduce((prev, guildCount) => prev + guildCount, 0);
      })
      .then(result => {
        return client.user.setActivity(botspeech.presenceSmiles.replace(/{{count}}/, result), { type: "PLAYING" });
      })
      .catch(console.error);
  }

  else if (num == 2)
  {
    client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')
      .then(results => {
        results.reduce((prev, memberCount) => prev + memberCount, 0);
      })
      .then(result => {
        return client.user.setActivity(botspeech.presenceUsers.replace(/{{count}}/, result), { type: "PLAYING" });
      })
      .catch(console.error);
  }
  */
  switch (num)
  {
    case 0:
      await client.user.setActivity(botspeech.presenceSmiles.replace(/{{count}}/, client.guilds.cache.size), { type:"PLAYING" })
        .then()
        .catch(console.error);
      return;
    case 1:
      await client.user.setActivity(botspeech.presenceChannels.replace(/{{count}}/, client.channels.cache.size), { type:"WATCHING" })
        .then()
        .catch(console.error);
      return;
    case 2:
      await client.user.setActivity(botspeech.presenceUsers.replace(/{{count}}/, client.users.cache.size), { type:"PLAYING" })
        .then()
        .catch(console.error);
      return;
    case 3:
      await client.user.setActivity(botspeech.presenceInvite, { type:"LISTENING" })
        .then()
        .catch(console.error);
      return;
  }
};