const pokeLists = require("../data/lists.js");

// Not Founds
exports.pkmnNotFound = "```The Pokémon requested was either not found or not available in current dens.```";
exports.ballNotFound = "```The ball requested was not found.```";
exports.commandNotFound = "```The requested command was not found.```";
exports.argNotFound = "```Arguments not found!\n";
exports.permNotFound = "you do not have the permissions to use this command.";
exports.roleNotFound = "```The requested role was not found.```";
exports.guildNotFound = "```The requested guild was not found.```";
exports.formNotFound = "```The form requested for this Pokémon doesn't exist.```";
exports.gmaxNotFound = "```This Pokémon does not have a Gigantamax form!```";

// User Help Messages
exports.pingableRoles = "Only Shiny Raid Pings and Giveaway Pings may be pinged.";
exports.disclaimerMsg = "*Assuming ball specific conditions have been met!*";
exports.noRaidEff = "(No effect on raids)"

// No Arg Calls -> May format with command structure
exports.pingNoArg = "```Please enter a role to ping.```";
exports.catchNoArg = "```Please enter a Pokémon to catch followed by a ball of your choice.```";
exports.denNoArg = "```that is not a den!```";
exports.reloadNoArg = "```Please enter a command to reload.```";

// Help Commands
exports.nonAdminCommands = "%help";
exports.adminCommands = "%help\n%ping [shiny | giveaway]";
exports.pokeCommands = "%den [Den Number]\n%catch [Pokémon Name]-(Form Name) (Ball Name) (Gmax Flag)\nForm Names Include -galar, -alola, etc.";
exports.commandDescription = "[ ] Indicate required fields.\n( ) Indicate optional fields.";

// Example Commands
exports.catchExample2 = "%catch gengar (ball/gmax)";
exports.catchExample3 = "%catch gengar (ball) (gmax)";

/*
exports.errHandler = (flag, args) => {
  if (flag == "notFounds")
  {
    let msg = "";
    args.forEach()
  } 
}
*/