const Employee = require("./employee.js");

function intern(name, id, title, school) {
    Employee.call(this, name, id, title);
    this.school = school;
    this.getSchool = function() {
        return this.school;
    }
    this.getRole = function() {
        return "Intern";
    };
}

// TESTING
// const jerry = new intern("Jerry", 42, "intern", "clown college");

// console.log(jerry);
// console.log(jerry.getRole());