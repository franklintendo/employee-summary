const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");

// Array for inquirer choices for roles
let roleList = ["Manager", "Engineer", "Intern"];

// Array for prompted Manager and Engineer information
const employeeData = [];
// Array for prompted Intern information
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
        // If the user selects manager, ask them a manager specific question
        // and create an instance of a Manager object
        if (response.role === "Manager") {
            const newManager = new Manager(response.name, response.id, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the manager's office number?",
                    name: "officeNumber"
                }
            ]).then(function(managerResponse){
                // Log their office number in the created Manager object
                newManager.officeNumber = managerResponse.officeNumber;

                // Remove manager from the list of roles to be chosen from
                // since it is already filled
                roleList = ["Engineer", "Intern"];

                // Create HTML block and feed inquirer prompts into it
                createManagerHTML(newManager.getName(), newManager.getEmail(), newManager.getId(), newManager.getRole(), newManager.getOfficeNumber());

                // Ask user if they would like to add another employee
                anotherEmployee();
            });
        } 
        else if (response.role === "Engineer") {
            // If the user selects engineer, ask them an engineer specific question
            // and create an instance of an Engineer object
            const newEngineer = new Engineer(response.name, response.id, response.email);
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the engineer's GitHub username?",
                    name: "github"
                }
            ]).then(function(engineerResponse){
                // Log their github username in the created Engineer object
                newEngineer.github = engineerResponse.github;

                // Create HTML block and feed inquirer prompts into it
                createEngineerHTML(newEngineer.getName(), newEngineer.getEmail(), newEngineer.getId(), newEngineer.getRole(), newEngineer.getGithub());

                // Ask user if they would like to add another employee
                anotherEmployee();
            });
        } else {
            // If the user selects intern, ask them an intern specific question
            // and create an instance of an Intern object
            const newIntern = new Intern(response.name, response.id, response.email);

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the intern's school?",
                    name: "school"
                }
            ]).then(function(internResponse){
                // Log their school in the created Intern object
                newIntern.school = internResponse.school;

                // Create HTML block and feed inquirer prompts into it
                createInternHTML(newIntern.getName(), newIntern.getEmail(), newIntern.getId(), newIntern.getRole(), newIntern.getSchool())

                // Ask user if they would like to add another employee
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
            // If they are finished adding employees
            // Then combine the array with the Manager and Engineer HTML blocks
            // with the Intern HTML blocks array
            employeeData.push(...internData);

            // Read the main template file and replace the placeholder content
            // with the employee HTML block
            fs.readFile("./templates/main.html", "utf8", function(err, data){
                if (err) {
                    return console.log(err);
                  }

                data = data.replace("{{ content }}", employeeData.join(""));

                // Write the team page
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

        // Place Manager html block as first item in the Employees array
        employeeData.unshift(data);
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
        
        // Place Engineer HTML block at the end of the employee array
        employeeData.push(data);
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

        // Place intern HTML block at the end of the intern array
        internData.push(data);

    });
}


