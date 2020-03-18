module.exports = {
  apps: [{
    name: "Alcremie-B",
    script: "./index.js",
    watch: true,
    watch_delay: 1000,
    ignore_watch: ["data", "deprecated", "node_modules"],
    cwd: "/home/pi/DiscordBots/Den-Bot/",
    error_file: "./data/logs/error.log",
    out_file: "./data/logs/out.log",
    log_file: "./data/logs/combined.log",
    time: true
  }]
};