const Employee = require("./employee.js");

function manager(name, id, title, officeNumber) {
    Employee.call(this, name, id, title);
    this.officeNumber = officeNumber;
    this.getRole = function() {
            return "Manager";
    };
}

// TESTING
// const jerry = new manager("Jerry", 42, "Manager", 42);

// console.log(jerry);
// console.log(jerry.getRole());

