// Keywords
exports.gigaKeywords = ["g", "-g", "g-", "giga", "gigantamax", "gmax"];
exports.adminRoles = ["Fattest Cake", "Elite Four"];
exports.moonPkmn = ["Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Cleffa", "Clefairy", "Clefable", "Igglybuff", "Jigglypuff", "Wigglytuff", "Munna", "Musharna"];
exports.excludedBalls = ["Timer Ball", "Quick Ball", "Love Ball", "Master Ball", "Level Ball", "Lure Ball", "Nest Ball", "Dive Ball", "Dream Ball"];
exports.promoPkmn = ["Applin", "Milcery", "Rolycoly", "Flapple","Alcremie", "Carkol", "Coalossal", "Lapras", "Appletun"];
exports.gmaxPkmn = ["Charizard", "Butterfree", "Pikachu", "Meowth", "Machamp", "Gengar", "Kingler", "Lapras", "Eevee", "Snorlax", "Garbodor", "Melmetal", "Corviknight", "Orbeetle", "Drednaw", "Coalossal", "Flapple", "Appletun", "Sandaconda", "Toxtricity", "Centiskorch", "Hatterene", "Grimmsnarl", "Alcremie", "Copperajah", "Duraludon"];

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

// Embeds
const pkmnEmbedColors = [
  {
    "type":"Normal",
    "color":10922870
  },
  {
    "type":"Fire",
    "color":16724480
  },
  {
    "type":"Water",
    "color":6916083
  },
  {
    "type":"Grass",
    "color":4772433
  },
  {
    "type":"Electric",
    "color":16569344
  },
  {
    "type":"Psychic",
    "color":16724352
  },
  {
    "type":"Ice",
    "color":8641754
  },
  {
    "type":"Dragon",
    "color":8913147
  },
  {
    "type":"Dark",
    "color":7624774
  },
  {
    "type":"Fairy",
    "color":16724178
  },
  {
    "type":"Fighting",
    "color":10297114
  },
  {
    "type":"Flying",
    "color":11830002
  },
  {
    "type":"Poison",
    "color":11670944
  },
  {
    "type":"Ground",
    "color":14992224
  },
  {
    "type":"Rock",
    "color":12231723
  },
  {
    "type":"Bug",
    "color":10403595
  },
  {
    "type":"Ghost",
    "color":7949977
  },
  {
    "type":"Steel",
    "color":12236497
  }
]
exports.colorFinder = (pkmn) => {
  let color = pkmnEmbedColors.find(x => {
    return x.type == pkmn.type1;
  });
  if (!color)
    return 12236497;

  else
    return color.color;
}

exports.catchEmbed = {embed: {
  title: "Best Catch Rates by Ball",
  description: "The best balls to catch ",
}}

