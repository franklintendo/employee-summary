const Employee = require("./employee.js");

function Manager(name, id, title, email, officeNumber) {
    Employee.call(this, name, id, title, email);
    this.officeNumber = officeNumber;
    this.getRole = function() {
            return "Manager";
    };
}

module.exports = Manager;

// TESTING
// const jerry = new manager("Jerry", 42, "Manager", 42);

// console.log(jerry);
// console.log(jerry.getRole());

