const Employee = require("./employee.js");

function engineer(name, id, title, github) {
    Employee.call(this, name, id, title);
    this.github = github;
    this.getGithub = function() {
        return this.github;
    }
    this.getRole = function() {
        return "Engineer";
    };
}

// TESTING
// const jerry = new engineer("Jerry", 42, "intern", "jerrygithub");

// console.log(jerry);
// console.log(jerry.getRole());