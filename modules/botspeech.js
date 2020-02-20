// Not Founds
exports.pkmnNotFound = "```The Pokémon requested was either not found or not available in current dens.```";
exports.ballNotFound = "```The ball requested was not found.```";
exports.commandNotFound = "```The requested command was not found.```";
exports.argNotFound = "```Arguments not found!```";
exports.permNotFound = "you do not have the permissions to use this command.";
exports.roleNotFound = "```The requested role was not found.\nThe pingable roles for this server are: {{roles}}```";
exports.guildNotFound = "```The requested guild was not found.```";
exports.formNotFound = "```The form requested for this Pokémon was not found.```";
exports.gmaxNotFound = "```This Pokémon does not have a Gigantamax form!```";
exports.guildConfNotFound = "No Guild configuration was found.";

// User Help Messages
exports.disclaimerMsg = "Ball conditions met: {{condcheck}}";
exports.noRaidEff = "(No effect on raids)";
exports.requiredPrefix = "`Please enter a Non-Alphanumeric prefix to be used with the bot.`";
exports.configReset = "`The Guild Configurations for this server have been reset.`";
exports.addAdminRoles = "The following roles have been added as admin roles: {{roles}}";
exports.addPingRoles = "The following roles have been added as pingable roles: {{roles}}";
exports.noRolesAdded = "`No roles have been added and/or found.`";
exports.configNoChange = "`These configuration setting cannot be changed.`";
exports.rolePlacement = "The {{role}} role is below this bot's role. Please move this bot's role above {{role}} to be able to ping it.";
exports.pingError = "`Error with the pinging process. Contact a server admin.`";
exports.noChannelsAdded = "`No channels have been restricted and/or found.`";
exports.addChannels = "Alcremie-B has been restricted to the following channels: {{channels}}.";

// No Arg Calls -> May format with command structure
exports.pingNoArg = "```Please enter a role to ping.```";
exports.catchNoArg = "```Please enter a Pokémon to catch followed by a ball of your choice.```";
exports.denNoArg = "```Please enter either a Den Number or a Pokémon to fetch.```";
exports.reloadNoArg = "```Please enter a command to reload.```";
exports.setconfNoArg = "```Please enter a configuration property to set followed by the desired setting.```";
exports.ballNoArg = "```Please enter a Pokè-Ball name.```";

// Help Commands
exports.nonAdminCommands = "{{prefix}}help\n{{prefix}}latency\n{{prefix}}credits";
exports.adminCommands = "{{prefix}}help\n{{prefix}}latency\n{{prefix}}credits\n{{prefix}}ping [First word of pingable role]\n{{prefix}}setconf [prefix | adminroles | pingroles] [nonalpha char | roles]\n{{prefix}}showconf\n{{prefix}}resetconf";
exports.pokeCommands = "{{prefix}}den [Den Number | Pokémon Name]\n{{prefix}}catch [Pokémon Name] (Form Name) (Ball Name)\n{{prefix}}pokedex [Pokémon Name] (Form Name)\n{{prefix}}ball [Ball Name]\n{{prefix}}natures\nForm Names Include gmax, galar, alola, etc.";
exports.commandDescription = "[ ] Indicate required fields.\n( ) Indicate optional fields.\nUse * for shiny sprites.\n*Catch Rates are calculated under Raid Specific Conditions: Levels 30-70, 1 HP, and no status modifiers.*";
exports.presence = "Serving up smiles in {{guildcount}} guilds!";
exports.helpSupport = "[Need more help? Join Alcremie-B's support server!](https://discord.gg/ZZU77fz)";

// Credits
exports.creditsDescription = "Many thanks to everyone listed below, as without them this bot wouldn't be possible:";
exports.creditsExternal = "[Serebii](https://Serebii.net) & [Bulbapedia](https://Bulbapedia.bulbagarden.net) for their mass wealth of Pokèmon information and their dedication to host it.";
exports.creditsSprites = "[PkParaíso](https://pkparaiso.com) & [Ian Clail](https://www.smogon.com/forums/threads/sun-moon-sprite-project.3577711/) (Layell) for their lovely sprite work on 1300+ Pokèmon & Forms.";
exports.creditsOthers = "Rhode & All of the people over at [Pokèmon Raiders](https://discordapp.com/invite/pokemonraiders) for the idea & their kindliness.";
// Dilapidated

// Not Yet Implemented
// \n{{prefix}}balls (Ball Name | Pokémon Name)
// \n{{prefix}}credits