# Alcremie-B Discord Bot ![Bot PFP](https://raphgg.github.io/den-bot/data/icons/botpfp.png "Lovely Baby")
A Pokémon statistics Discord bot with the intended purpose of facilitating Max Raid Battles in Pokémon Sword & Pokémon Shield.


## Discord Usage & Top.gg
[Invite](https://discordapp.com/api/oauth2/authorize?client_id=663505910580248587&permissions=0&scope=bot "Alcremie-B w/ No Permissions") Alcremie-B to your own Discord Server!

[Upvote](https://top.gg/bot/663505910580248587/vote "Thanks for voting!") Alcremie-B on Top.gg so that others can see it!

![Alcremie-B Widget](https://top.gg/api/widget/663505910580248587.svg)

## Features 
* Quick and fully featured access to latest Pokémon Data, such as: Base Stats / Abilities / Den Locations / And more!
* Fully implemented catch rate calculator for Pokémon encountered in raids.
* Fast Den Information look-up including Pokémon lists and Hidden Ability availability.
* Configurable settings to allow Server Admins to automate role pinging.

## Commands
* `[ ]` Indicate Required Fields
* `( )` Indicate Optional Fields
* Use * on Pokémon Fields for shiny sprites

| Command       | Arguments                | Descrition                                                                 |
|---------------|--------------------------|----------------------------------------------------------------------------|
| `%catch`      | `[Pokémon] (Form) (Ball)`| Shows a detailed summary of catch rates for a given Pokémon & Ball         |
| `%den`        | `[Den #] / [Pokémon]`    | Shows a list of Pokémon that belong to a den including their HAs           |
| `%pokedex`    | `[Pokémon]`              | Shows a detailed summary of a Pokémon's latest Statistics (Gen 8 / Gen 7)  |
| `%ball`       | `[Ball]`                 | Shows a summary of a Poké-Ball's statistics                                |
| `%natures`    |                          | Displays an in-depth Pokémon natures chart from Bulbapedia                 |
| `%sprite`     |                          | Displays a Pokémon's latest in-game sprite                                 |
| `%types`      |                          | Displays an in-depth type effectivness chart                               |
| `%showconf`   |                          | Displays the server's current bot settings in a JSON Format                |
| `%setconf`    | `[Setting] [Value(s)]`   | Sets the specified setting's value(s)                                      |
| `%resetconf`  |                          | Resets the server's current bot settings to default                        |
| `%help`       |                          | Displays a help message with this table of commands                        |
| `%latency`    |                          | Pings the bot's & discord's API and returns the latency in milliseconds    |
| `%credits`    |                          | Displays a credit and thanks message                                       |

## Configuration Settings
The bot has a selection of configuration settings that can be changed by the server owner or a registered server admin. The full list of settings along with examples on how to use them are listed below:

  `%setconf prefix (Non-alphanumeric Character)`
  
  Sets the bot's prefix for your server to a given character: `%setconf prefix !`
  
  ___

  `setconf denpkmnonly (true | false)`
  
  Toggles between fetching Pokémon statistics from only those that can appear in Sword and Shield Max Raid Dens: `%setconf denpkmnonly true`
  
  ___

  `%setconf shinypkmnonly (true | false)`
  
  Toggles between displaying shiny Pokémon sprites only: `%setconf shinypkmnonly true`
  ___
  
  `%setconf restrictedchannels (channel-one, channel-two, etc)`
  
  Restricts Alcremie-B to only respond in the channels listed. Alcremie-B will respond to server admins and server owner regardless of this setting: `%setconf restrictedchannels alcremie-test, botspam`
  
  ___

The following is what `%showconf` would look like after performing each of the above example commands:

```json

{
 "prefix": "!",
 "denpkmnonly": true,
 "shinypkmnonly": true,
 "restrictedchannels": [
  {
   "name": "alcremie-test",
   "id": "ID#"
  },
  {
   "name": "botspam",
   "id": "ID#"
  }
 ]
}

```

## Example Images
`%catch gmax gengar`

![Catch Gengar Gmax](https://raphgg.github.io/den-bot/data/readme/catchgengargmax.png "Big Baby Boy")

`%catch gmax gengar fast`

![Catch Gengar Gmax Fast](https://raphgg.github.io/den-bot/data/readme/catchgengarfast.png "Speedy Boy 😳")

`%catch gmax gengar timer`

![Catch Gengar Gmax Timer](https://raphgg.github.io/den-bot/data/readme/catchgengartimer.png "He eats the clocks")

`%catch gmax appletun`

![Catch Appletun Gmax](https://raphgg.github.io/den-bot/data/readme/catchappletungmax.png "Promoted Apple of my Eye")

`%den 23`

![Den 23](https://raphgg.github.io/den-bot/data/readme/den23.png "Den Info!")

`%den frosmoth`

![Den Frosmoth](https://raphgg.github.io/den-bot/data/readme/denfrosmoth.png "Cutie Patootie")

`%pokedex froslass`

![Pokedex Froslass](https://raphgg.github.io/den-bot/data/readme/pokedexfroslass.png "Best Pokémon Ever Made, Thanks For Coming to My TED Talk.")

## Support & Progress
* [Join](https://discord.gg/ZZU77fz) Alcremie-B's support server to test, get help, and give feedback for the bot!
* [Follow](https://app.gitkraken.com/glo/board/XjQu3nV7egARKaLs) Alcremie-B's progress and updates on its Gitkraken Glo Board!

## Credits
* Many thanks to everyone listed below as without them this bot wouldn't be possible:
- * [Serebii](https://Serebii.net) & [Bulbapedia](https://bulbapedia.bulbagarden.net/) for their mass wealth of Pokémon information and their dedication to host it.
- * [PkParaíso](https://pkparaiso.com) & [Ian Clail](https://www.smogon.com/forums/threads/sun-moon-sprite-project.3577711/) [Layell] for their lovely sprite work on over 1300 different Pokémon & Forms.
- * [Tax](https://imgur.com/gallery/Tb82GTc) for their awesome gif work on the ball animations.
- * Shirayuki for the bot's profile picture.
- * All of the people over at [Pokémon Raiders](https://discordapp.com/invite/pokemonraiders) for the idea & kindliness.
