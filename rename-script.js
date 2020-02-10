const fs = require("fs");

let path = "./data/sprites/pokemon/normal"

let normals = fs.readdirSync(path);

normals.forEach(mon => {
  let search = mon.search(/-mega\b/gi);
  if (search == -1)
    return;

  let newmon = "mega-" + mon.replace(/-mega\b/, "");
  console.log(newmon);


  //fs.renameSync(path + mon, path + )
})