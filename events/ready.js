const botspeech = require("../modules/botspeech.js");
const DBL = require("dblapi.js");

module.exports = (client) => {
  const dbl = new DBL(client.config.tokenDBL, client);
  dbl.on("posted", () => (console.log("Server count posted!")));

  let num = -1;
  setPresence(client, 0);
  setInterval(() => {
    setPresence(client, ++num%4);
  }, 120 * 1000);

  dbl.postStats(client.guilds.size);
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800 * 1000);

  return console.log("I am ready!");
};

const setPresence = async (client, num) => {
  console.log(num);
  switch (num)
  {
    case 0:
      await client.user.setActivity(botspeech.presenceSmiles.replace(/{{count}}/, client.guilds.size), { type:"PLAYING" })
        .then()
        .catch(console.error);
      return;
    case 1:
      await client.user.setActivity(botspeech.presenceChannels.replace(/{{count}}/, client.channels.size), { type:"WATCHING" })
        .then()
        .catch(console.error);
      return;
    case 2:
      await client.user.setActivity(botspeech.presenceUsers.replace(/{{count}}/, client.users.size), { type:"PLAYING" })
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