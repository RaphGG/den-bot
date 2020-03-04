// Not Founds
exports.pkmnNotFound = "```The Pokémon requested was not found.```";
exports.ballNotFound = "```The Pokè-Ball requested was not found.```";
exports.ballOrPkmnNotFound = "```Either the Pokèmon, Pokè-Ball, or both requested were not found.```";
exports.cmdNotFound = "```The requested command was not found.```";
exports.permNotFound = "you do not have the permissions to use this command.";
exports.guildConfNotFound = "```The requested guild configuration setting was not found.```";
exports.typesNotFound = "```The requested type(s) was not found.```";

// User Interface Messages
exports.requiredPrefix = "```Please enter a Non-Alphanumeric prefix to be used with the bot.```";
exports.configReset = "```The Guild Configurations for this server have been reset.```";
exports.guildOnlyCmd = "```This command is only available in guilds.```";

exports.noChannelsAdded = "```No channels have been restricted and/or found.```";
exports.addChannels = "Alcremie-B has been restricted to the following channels: {{channels}}.";

// No Arg Calls
exports.ballNoArg = "```Please enter a Pokè-Ball.```";
exports.catchNoArg = "```Please enter a Pokémon to catch followed by a Pokè-Ball of your choice.```";
exports.denNoArg = "```Please enter either a Den Number or a Pokémon to fetch.```";
exports.pokedexNoArg = "```Please enter a Pokèmon name.```";
exports.reloadNoArg = "```Please enter a command to reload.```";
exports.setconfNoArg = "```Please enter a configuration property to set followed by the desired setting.```";
exports.spriteNoArg = "```Please enter a Pokémon name.```";
exports.typeNoArg = "```Please enter a Pokémon type.```";

// Help Commands
exports.userCommands = "{{prefix}}help (Command)\n{{prefix}}invite\n{{prefix}}latency\n{{prefix}}credits";

exports.adminCommands = "{{prefix}}setconf [prefix | restrictedchannels] [New Prefix | Restricted Channels]\n{{prefix}}showconf\n{{prefix}}resetconf";

exports.pokeCommands = "{{prefix}}den [Den Number | Pokémon Name]\n{{prefix}}catch [Pokémon Name] (Form Name) (Ball Name)\n{{prefix}}pokedex [Pokémon Name] (Form Name)\n{{prefix}}ball [Ball Name]\n{{prefix}}natures\n{{prefix}}sprite [Pokèmon Name]\n{{prefix}}type [Pokèmon Type 1] (Pokèmon Type 2)\nForm Names Include gmax, galar, alola, etc.";

exports.commandDescription = "[ ] Indicate required fields.\n( ) Indicate optional fields.\nUse * for shiny sprites.\n*Catch Rates are calculated under Raid Specific Conditions: Levels 30-70, 1 HP, and no status modifiers.*";

exports.helpSupport = "[Need more help? Join Alcremie-B's support server!](https://discord.gg/ZZU77fz)\n[Want Alcremie-B in your server? Click here to invite!](https://discordapp.com/api/oauth2/authorize?client_id=663505910580248587&permissions=0&scope=bot)";

// Credits
exports.creditsDescription = "Many thanks to everyone listed below, as without them this bot wouldn't be possible:";

exports.creditsExternal = "[Serebii](https://Serebii.net) & [Bulbapedia](https://Bulbapedia.bulbagarden.net) for their mass wealth of Pokèmon information and their dedication to host it.";

exports.creditsSprites = "[PkParaíso](https://pkparaiso.com) & [Ian Clail](https://www.smogon.com/forums/threads/sun-moon-sprite-project.3577711/) (Layell) for their lovely sprite work on 1300+ Pokèmon & Forms.\n[Tax](https://imgur.com/gallery/Tb82GTc) & Shirayuki for the ball animation sprites and bot's profile picture respectively.";

exports.creditsOthers = "All of the people over at [Pokèmon Raiders](https://discordapp.com/invite/pokemonraiders) for the idea & their kindliness.";

// Invites
exports.inviteDescription = "Thank you so much for wanting Alcremie-B in your server! Below you'll find a link to add Alcremie-B without any permissions. If you'd like to use the %ping command, make sure to give Alcremie-B the Manage Roles Permission once she's there! Enjoy!\n[Click Here!](https://discordapp.com/api/oauth2/authorize?client_id=663505910580248587&permissions=0&scope=bot)";


// Presences
exports.presenceSmiles = "Serving up smiles in {{count}} guilds!";
exports.presenceChannels = "Max Raid Battles in {{count}} channels!";
exports.presenceUsers = "Pokèmon Sword and Shield with {{count}} trainers!";
exports.presenceInvite = "Use %invite to invite me to your server!";


/*
Dilapidated
exports.argNotFound = "```Arguments not found!```";
exports.roleNotFound = "```The requested role was not found.\nThe pingable
roles for this server are: {{roles}}```";
exports.guildNotFound = "```The requested guild was not found.```";
exports.formNotFound = "```The form requested for this Pokémon was not found.
```";
exports.gmaxNotFound = "```This Pokémon does not have a Gigantamax form!```";
exports.disclaimerMsg = "Ball conditions met: {{condcheck}}";
exports.noRaidEff = "(No effect on raids)";

exports.addAdminRoles = "The following roles have been added as admin roles: {{roles}}";
exports.noRolesAdded = "```No roles have been added and/or found.```";
exports.configNoChange = "```These configuration setting cannot be changed.```";
exports.rolePlacement = "The {{role}} role may be below this Alcremie-B's bot role. Please make sure Alcremie-B has the manage roles permission and that her role is above {{role}} to be able to ping it.";

const presenceSmiles = { name: "Serving up smiles in {{count}} guilds!", type:"PLAYING" };

const presenceChannels = { name:"Max Raid Battles in {{count}} channels!", type:"WATCHING" };
const presenceUsers = { name:"Pokèmon Sword and Shield with {{count}} trainers!", type:"PLAYING" };
const presenceInvite = { name:"Use %invite to invite me to your server!", type:"LISTENING" };

exports.presences = [presenceSmiles, presenceChannels, presenceUsers, presenceInvite];
*/

// Not Yet Implemented
// \n{{prefix}}balls (Ball Name | Pokémon Name)
// \n{{prefix}}credits