// const ok = require("./templates/manager");

const fs = require("fs");


fs.readFile("./templates/manager.html", "utf8", function(err, data){
    console.log(data);
})

function changePlaceholders(placeholder, output)



