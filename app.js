inquirer = require("inquirer");

inquirer
.prompt([
    type = "input",
    message = "What is your email?",
    name = "email" 
])
.then(console.log(data.email));