const { ShardingManager } = require('discord.js');
const config = require("./config.json");
const manager = new ShardingManager('./bot.js', { token: config.tokentest });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();