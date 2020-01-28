// Not Founds
exports.pkmnNotFound = "```The Pokémon requested was either not found or not available in current dens.```";
exports.ballNotFound = "```The ball requested was not found.```";
exports.commandNotFound = "```The requested command was not found.```";
exports.argNotFound = "```Arguments not found!";
exports.permNotFound = "you do not have the permissions to use this command.";
exports.roleNotFound = "```The requested role was not found.```";
exports.guildNotFound = "```The requested guild was not found.```";
exports.formNotFound = "```The form requested for this Pokémon was not found.```";
exports.gmaxNotFound = "```This Pokémon does not have a Gigantamax form!```";
exports.guildConfNotFound = "No Guild configuration was found.";

// User Help Messages
exports.pingableRoles = "Only {{roles}} may be pinged.";
exports.disclaimerMsg = "*Assuming ball specific conditions have been met!*";
exports.noRaidEff = "(No effect on raids)";
exports.requiredPrefix = "Please enter a Non-Alphanumeric prefix to be used with the bot.";
exports.configReset = "The Guild Configurations for this server have been reset.";

// No Arg Calls -> May format with command structure
exports.pingNoArg = "```Please enter a role to ping.```";
exports.catchNoArg = "```Please enter a Pokémon to catch followed by a ball of your choice.```";
exports.denNoArg = "```Please enter either a Den Number or a Pokémon to fetch.```";
exports.reloadNoArg = "```Please enter a command to reload.```";
exports.setconfNoArg = "```Please enter a configuration property to set followed by the desired setting.```";


// Help Commands
exports.nonAdminCommands = "{{prefix}}help";
exports.adminCommands = "{{prefix}}help\n{{prefix}}ping [shiny | giveaway]";
exports.pokeCommands = "{{prefix}}den [Den Number | Pokémon Name]\n{{prefix}}catch [Pokémon Name]-(Form Name) (Ball Name)\nForm Names Include -gmax, -galar, -alola, etc.";
exports.commandDescription = "[ ] Indicate required fields.\n( ) Indicate optional fields.";

// Example Commands
exports.catchExample2 = "{{prefix}}catch gengar (ball/gmax)";
exports.catchExample3 = "{{prefix}}catch gengar (ball) (gmax)";

/*
exports.errHandler = (flag, args) => {
  if (flag == "notFounds")
  {
    let msg = "";
    args.forEach()
  } 
}
*/