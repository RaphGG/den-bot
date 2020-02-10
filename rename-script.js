const fs = require("fs");

let path = "./data/sprites/pokemon/shiny/"

let normals = fs.readdirSync(path);

normals.forEach(mon => {
  let search = mon.search(/-trim\b/gi);
  if (search == -1)
    return;

  let newmon = mon.replace(/-trim\b/gi, "");
  console.log(newmon);


  fs.renameSync(path + mon, path + newmon);
})