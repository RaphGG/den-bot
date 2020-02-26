const botspeech = require("../modules/botspeech.js");

module.exports = (client) => {
  setRandomPresence(client, 0);

  presenceCycle(client, 1);

  return console.log("I am ready!");
};

const presenceCycle = (client, num) => {
  setTimeout(() => {
    setRandomPresence(client, num);
    presenceCycle(client, ++num % 3);
  }, 120 * 1000);
};

const setRandomPresence = (client, num) => {
  switch (num)
  {
    case 0:
      return client.user.setActivity(botspeech.presenceSmiles.replace(/{{count}}/, client.guilds.size));
    case 1:
      return client.user.setActivity(botspeech.presenceChannels.replace(/{{count}}/, client.channels.size));
    case 2:
      return client.user.setActivity(botspeech.presenceUsers.replace(/{{count}}/, client.users.size));
  }
};