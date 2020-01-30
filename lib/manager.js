const Employee = require("./employee.js");

function Manager(name, id, email, officeNumber) {
    Employee.call(this, name, id, email);
    this.officeNumber = officeNumber;
    this.getRole = function() {
        return "Manager";
    };
    this.getOfficeNumber = function() {
        return this.officeNumber;
    };
}

module.exports = Manager;

// TESTING
// const jerry = new manager("Jerry", 42, "Manager", 42);

// console.log(jerry);
// console.log(jerry.getRole());

