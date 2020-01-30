const inquirer = require("inquirer");
const manager = require("./lib/manager.js");
const engineer = require("./lib/engineer.js");
const intern = require("./lib/intern.js");

inquirer
.prompt([
    {
        type: "input",
        message: "What is your email?",
        name: "email" 
    }, 
    {
        type: "input",
        message: "What is your id?",
        name: "id"
    },
    {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    }
])
.then(function(response){
    console.log(response.email);
});

