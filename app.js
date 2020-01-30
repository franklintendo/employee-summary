const inquirer = require("inquirer");
const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");



let roleList = ["Manager", "Engineer", "Intern"];

const getEmployeeInfo = function() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name" 
        }, 
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email" 
        }, 
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: roleList
        }
    ])
    .then(function(response){
        if (response.role === "Manager") {
            const newManager = new Manager(response.name, response.id, response.role, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the manager's office number?",
                    name: "officeNumber"
                }
            ]).then(function(managerResponse){
                newManager.officeNumber = managerResponse.officeNumber;

                roleList = ["Engineer", "Intern"];

                console.log(newManager);
                // module.exports = newManager;
                anotherEmployee();
            });
        } 
        else if (response.role === "Engineer") {
            const newEngineer = new Engineer(response.name, response.id, response.role, response.email);
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the engineer's GitHub username?",
                    name: "github"
                }
            ]).then(function(engineerResponse){
                newEngineer.github = engineerResponse.github;

                console.log(newEngineer);

                anotherEmployee();
            });
        } else {
            const newIntern = new Intern(response.name, response.id, response.role, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the intern's school?",
                    name: "school"
                }
            ]).then(function(internResponse){
                newIntern.school = internResponse.school;

                console.log(newIntern);

                anotherEmployee();
            });
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


