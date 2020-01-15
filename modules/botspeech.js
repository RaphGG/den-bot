// Keywords
exports.gigaKeywords = ["g", "-g", "g-", "giga", "gigantamax", "gmax"];
exports.adminRoles = ["Fattest Cake", "Elite Four"];
exports.moonPkmn = ["Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Cleffa", "Clefairy", "Clefable", "Igglybuff", "Jigglypuff", "Wigglytuff", "Munna", "Musharna"];
exports.excludedBalls = ["Timer Ball", "Quick Ball", "Heavy Ball", "Love Ball", "Master Ball", "Level Ball", "Lure Ball", "Nest Ball", "Dive Ball", "Dream Ball", "Net Ball"];

// Not Founds
exports.pkmnNotFound = "The Pokémon requested was either not found or not available in current dens.";
exports.ballNotFound = "The ball requested was not found.";
exports.commandNotFound = "The requested command was not found.";
exports.argNotFound = "The requested command with the inputted arguments was not found.";
exports.permNotFound = "you do not have the permissions to use this command.";
exports.roleNotFound = "The requested role was not found.";

// User Help Messages
exports.pingableRoles = "Only Shiny Raid Pings and Giveaway Pings may be pinged.";

// No Arg Calls -> May format with command structure
exports.pingNoArg = "Please enter a role to ping.";
exports.catchNoArg = "Please enter a Pokémon to catch followed by a ball of your choice.";
exports.denNoArg = "That is not a den!";
exports.reloadNoArg = "Please enter a command to reload.";

// Help Commands
exports.nonAdminCommands = "%help";
exports.adminCommands = "%help\n%ping [shiny | giveaway]";
exports.pokeCommands = "%den [#Den Number]\n%catch [Pokémon Name] (Ball Name) (Gmax Flag)";
exports.commandDescription = "[ ] Indicate required fields.\n( ) Indicate optional fields.";