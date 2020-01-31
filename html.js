const fs = require("fs");


fs.readFile("./templates/manager.html", "utf8", function(err, data){
    console.log(data);
    data = data.replace("{{ name }}", "Frank").replace("{{ email }}", "frank@goo.com").replace("{{ id }}", "42").replace("{{ role }}", "Manager").replace("{{ officeNumber }}", "12");
    console.log(data);

    fs.writeFile("./output/test.html", data, function(err){

    });
})



