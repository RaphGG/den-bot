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
exports.requiredPrefix = "Please enter a Non-Alphanumeric prefix to be used with the bot.";
exports.configReset = "The Guild Configurations for this server have been reset.";
exports.addAdminRoles = "The following roles have been added as admin roles: {{roles}}";
exports.addPingRoles = "The following roles have been added as pingable roles: {{roles}}";

// No Arg Calls -> May format with command structure
exports.pingNoArg = "```Please enter a role to ping.```";
exports.catchNoArg = "```Please enter a Pokémon to catch followed by a ball of your choice.```";
exports.denNoArg = "```Please enter either a Den Number or a Pokémon to fetch.```";
exports.reloadNoArg = "```Please enter a command to reload.```";
exports.setconfNoArg = "```Please enter a configuration property to set followed by the desired setting.```";

// Help Commands
exports.nonAdminCommands = "{{prefix}}help\n{{prefix}}credits";
exports.adminCommands = "{{prefix}}help\n{{prefix}}ping [First word of pingable role]\n{{prefix}}setconf [prefix | adminroles | pingroles] [nonalpha char | roles]\n{{prefix}}showconf\n{{prefix}}resetconf";
exports.pokeCommands = "{{prefix}}den [Den Number | Pokémon Name]\n{{prefix}}catch [Pokémon Name]-(Form Name) (Ball Name)\n{{prefix}}pokedex [Pokémon Name]-(Form Name)\n{{prefix}}balls (Ball Name | Pokémon Name)\nForm Names Include -gmax, -galar, -alola, etc.";
exports.commandDescription = "[ ] Indicate required fields.\n( ) Indicate optional fields.\nUse * for shiny sprites.";
exports.presence = "Serving up smiles in {{guildcount}} guilds!";