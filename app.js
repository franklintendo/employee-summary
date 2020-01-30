const inquirer = require("inquirer");
const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");

const getEmployeeInfo = function() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name" 
        }, 
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
        if (response.role === "Manager") {
            const newEmployee = new Manager(response.name, response.id, response.role, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your office number?",
                    name: "officeNumber"
                }
            ]).then(function(managerResponse){
                newEmployee.officeNumber = managerResponse.officeNumber;

                console.log(newEmployee);
                anotherEmployee();
            });
            } else if (response.role === "Engineer") {

            } else {

            }
        });
}


// Ask user for employee information when node app is ran
getEmployeeInfo();

// Helper function to ask if user wants to enter
// another employee's information
function anotherEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add another employee?",
            name: "answer",
            choices: ["Yes", "No"]
        }
    ]).then(function(response){
        // If they want to enter another employee
        // Then rerun the initial prompts for employee info
        if (response.answer === "Yes") {
            getEmployeeInfo();
        } else {

        }
    })
}


