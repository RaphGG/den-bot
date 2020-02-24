const fs = require("fs");

let path = "./data/sprites/newgifs/";

let balls = fs.readdirSync(path);

balls.forEach(ball => {

  let newball = ball.replace(/ Ball/gi, "").toLowerCase();
  console.log(newball);

  fs.renameSync(path + ball, path + newball);
})