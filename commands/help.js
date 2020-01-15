const botspeech = require("../modules/botspeech.js");

exports.run = (client, message) => {
  let isAdmin = message.member.roles.some(role => {
    return botspeech.adminRoles.includes(role.name);
  });

  if (isAdmin)
    return message.channel.send({embed: {
      color: 14315906,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "All Bot Commands:",
      description: botspeech.commandDescription,
      fields: [{
        name: "Pokémon Commands:",
        value: botspeech.pokeCommands
      },
      {
        name: "User Commands:",
        value: botspeech.adminCommands
      }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Alcremie-B, by Droopy"
      }
    }});
  
  else
    return message.channel.send({embed: {
      color: 14315906,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Bot Commands:",
      description: botspeech.commandDescription,
      fields: [{
        name: "Pokémon Commands:",
        value: botspeech.pokeCommands
      },
      {
        name: "User Commands:",
        value: botspeech.nonAdminCommands
      }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Alcremie-B, by Droopy"
      }
    }});
}