const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");




let roleList = ["Manager", "Engineer", "Intern"];

const employeeData = [];
const internData = [];

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
            const newManager = new Manager(response.name, response.id, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the manager's office number?",
                    name: "officeNumber"
                }
            ]).then(function(managerResponse){
                newManager.officeNumber = managerResponse.officeNumber;

                roleList = ["Engineer", "Intern"];

                // console.log(newManager);
                // module.exports = newManager;
                createManagerHTML(newManager.getName(), newManager.getName(), newManager.getId(), newManager.getRole(), newManager.getOfficeNumber());

                anotherEmployee();
            });
        } 
        else if (response.role === "Engineer") {
            const newEngineer = new Engineer(response.name, response.id, response.email);
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the engineer's GitHub username?",
                    name: "github"
                }
            ]).then(function(engineerResponse){
                newEngineer.github = engineerResponse.github;

                // console.log(newEngineer);
                
                createEngineerHTML(newEngineer.getName(), newEngineer.getId(), newEngineer.getRole(), newEngineer.getGithub());
                anotherEmployee();
            });
        } else {
            const newIntern = new Intern(response.name, response.id, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the intern's school?",
                    name: "school"
                }
            ]).then(function(internResponse){
                newIntern.school = internResponse.school;

                createInternHTML(newIntern.getName(), newIntern.getId(), newIntern.getRole(), newIntern.getSchool())
                // console.log(newIntern);

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
            employeeData.push(...internData);

            fs.readFile("./templates/main.html", "utf8", function(err, data){
                if (err) {
                    return console.log(err);
                  }

                data = data.replace("{{ content }}", employeeData.join(""));

                fs.writeFile("./output/team.html", data, function(err){
                    if (err) {
                        return console.log(err);
                    }
                    console.log("HTML complete.")
                });
            });
            
        }
    })
}

// Read Manager HTML file and ascribe inquirer 
// prompt responses to code
function createManagerHTML(name, email, id, role, officeNumber) {
    fs.readFile("./templates/manager.html", "utf8", function(err, data){
        if (err) {
            return console.log(err);
          }
        data = data.replace("{{ name }}", name).replace("{{ email }}", email).replace("{{ id }}", id).replace("{{ role }}", role).replace("{{ officeNumber }}", officeNumber);

        employeeData.unshift(data);
        // console.log(employeeData);
    });
}

// Read Engineer HTML file and ascribe inquirer 
// prompt responses to code
function createEngineerHTML(name, email, id, role, github) {
    fs.readFile("./templates/engineer.html", "utf8", function(err, data){
        if (err) {
            return console.log(err);
          }
        data = data.replace("{{ name }}", name).replace("{{ email }}", email).replace("{{ id }}", id).replace("{{ role }}", role).replace("{{ github }}", github);

        employeeData.push(data);
        // console.log(employeeData);
    });
}

// Read Intern HTML file and ascribe inquirer 
// prompt responses to code
function createInternHTML(name, email, id, role, school) {
    fs.readFile("./templates/intern.html", "utf8", function(err, data){
        if (err) {
            return console.log(err);
          }
        data = data.replace("{{ name }}", name).replace("{{ email }}", email).replace("{{ id }}", id).replace("{{ role }}", role).replace("{{ school }}", school);

        internData.push(data);
        // console.log(internData);

    });
}


