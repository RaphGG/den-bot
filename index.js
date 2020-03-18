// Out with the old and in with the new.

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
    const eventName = file.split(".")[0];
    console.log(`Attempting to load event ${i+1} of ${files.length}: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

// Mapping commands as (K, V) -> (CommandName, CommandModule).
// Mapping guild specific settings as (K, V) -> (GuildID, SettingsJSON).
client.commands = new Discord.Collection();
client.settings = new Map();

fs.readdir("./data/settings/", (err, files) => {
  if (err) return console.error(err);

  console.log(`Loading Guild Settings for ${files.length} Guilds.`);

  files.forEach(file => {
    const data = fs.readFileSync(`./data/settings/${file}`);
    let setting;
    try
    {
      setting = JSON.parse(data);
    }
    catch
    {
      console.error(`File: ${file} is corrupted.`);
    }
    const guildId = file.split(".")[0];
    client.settings.set(guildId, setting);
  });

  console.log(`Finished Loading Guild Settings for ${files.length} Guilds.`);
});

// Command loader to map commands as above into a Discord.js Collection
// which is held by the client (bot)
fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);

  console.log(`Loading ${files.length} commands:`);

  files.forEach((file, i) => {
    if (!file.endsWith("js")) return;

    const props = require(`./commands/${file}`);
    const commandName = file.split(".")[0];
    console.log(`Attempting to load command ${i+1} of ${files.length}: ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.login(config.token);