// Out with the old and in with the new.
// TODO: Guild-Specific configs?

// Module/Config/API Imports
const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

// Bot Creation
const client = new Discord.Client();
client.config = config;

// Event loader with client.on setup in a for loop. No need for repeated code.
// To ensure that event.bind() works, make sure event modules are written
// with a succint standard.
fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err);

  console.log(`Loading ${files.length} events:`);

  files.forEach((file, i) => {
    if (!file.endsWith("js")) return;

    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Attempting to load event ${i+1} of ${files.length}: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

// Mapping commands as (K, V) -> (CommandName, CommandModule)
client.commands = new Map();
client.settings = new Map();

const pokeraiders = {
  prefix: "%",
  roles:{
    owner:"648749959205879836",
    admin:"666443360483147808",
    mod:"648749558616162314",
    adminroles:["648749959205879836","666443360483147808","648749558616162314"],
    giveaway:"659252943622635526",
    shiny:"658892950717202452",
    pingableroles:["659252943622635526","658892950717202452"]
  },
  denOnly:true
}
client.settings.set("648747323190542338", pokeraiders);
/*
const denbot = {
  roles:{
      owner:"666283334418169879",
      admin:"666465912802639882",
      mod:"666283270215958538",
      adminroles:["666283334418169879","666465912802639882","666283270215958538"],
      giveaway:"666283431147077642",
      shiny:"666283386943438850",
      pingableroles:["666283431147077642","666283386943438850"]
  },
  denOnly:false
}
client.settings.set("663506927912878091", denbot);
*/

// Command loader to map commands as above into a Discord.js Collection 
// which is held by the client (bot)
fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);

  console.log(`Loading ${files.length} commands:`);

  files.forEach((file, i) => {
    if (!file.endsWith("js")) return;

    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${i+1} of ${files.length}: ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.login(config.tokentest);
// TEST SETUP