const Employee = require("./employee.js");

function Intern(name, id, email, school) {
    Employee.call(this, name, id, email);
    this.school = school;
    this.getSchool = function() {
        return this.school;
    }
    this.getRole = function() {
        return "Intern";
    };
}

module.exports = Intern;

// TESTING
// const jerry = new intern("Jerry", 42, "intern", "clown college");

// console.log(jerry);
// console.log(jerry.getRole());