const Employee = require("./employee.js");

function Engineer(name, id, title, email, github) {
    Employee.call(this, name, id, title, email);
    this.github = github;
    this.getGithub = function() {
        return this.github;
    }
    this.getRole = function() {
        return "Engineer";
    
    }
}
 
module.exports = Engineer;

// TESTING
// const jerry = new engineer("Jerry", 42, "intern", "jerrygithub");

// console.log(jerry);
// console.log(jerry.getRole());