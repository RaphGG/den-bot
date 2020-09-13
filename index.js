// Out with the old and in with the new.

// Module/Config/API Imports
const Discord = require("discord.js");

// This is fine, what I would recommend here is to have an example config that
// can be referenced for structure. As it is now, as a developer coming to work
// on this codebase, I have no idea what the config looks like.
//
// Even better, I would use .env instead of json, as that is how you would
// configure this on a production server.
// https://www.npmjs.com/package/dotenv
const config = require("./config.json");
const fs = require("fs");

// Bot Creation
const client = new Discord.Client();

// I looked around, and I noticed you are dynamically creating this property on
// the client object. This allowed in JavaScript, but its not good practice.
// When you add random fields that were not previously declared, it creates
// undefined behavior, and it makes it impossible to track once the app/codebase
// grows.
//
// I would recommend having a global config class/object instead that can
// imported/referenced where needed.
// checkout: https://github.com/caquillo07/telledu_server/blob/master/config/keys.js
// and how its used: https://github.com/caquillo07/telledu_server/blob/master/server.js#L12
client.config = config;

// Event loader with client.on setup in a for loop. No need for repeated code.
// To ensure that event.bind() works, make sure event modules are written
// with a succint standard.
//
// I noticed you load your commands and javascript files into the app, this is
// a really bad pattern as you are working against the module system built in.
// Not only that, but you are adding tons of overhead by loading the files
// synchronously using the system calls instead of the built in module system.
//
// I would create sort of a "commands" package, that has all the commands and
// you can then reference them where needed.
//
// Checkout how I load all the controllers on the server, this is very similar
// to what you are trying to do here.
// https://github.com/caquillo07/telledu_server/blob/master/controllers/index.js
// Then you can load them like so:
// https://github.com/caquillo07/telledu_server/blob/master/routes/index.js#L2-L13
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
//
// Same comment as above, do not add fields dynamically to an existing class.
client.commands = new Discord.Collection();
client.settings = new Map();

// Same comment as above, do not load files like this, instead use the built-in
// module system. The time you would want to load files using system calls is
// when you are loading things that are not supported by the module system. This
// would be stuff like binary files (images, videos, raw bytes), text files, etc.
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

// This method returns a promise that is not being handled. You always want to
// handle all possible failures, this will prevent you application from crashing.
// I would do this instead:
/**
client.login(config.token)
    .then(() => {
      // handle success
      console.log("logged in to discord");
    })
    .catch(reason => {
      // handle error
      console.log("failed to login to discord: ", reason);
    });
*/
client.login(config.token);