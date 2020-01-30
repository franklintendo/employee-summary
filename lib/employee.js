function Employee(name, id, title){
    this.name = name,
    this.id = id,
    this.title = title,
    this.getName = function() {
        return this.name;
    },
    this.getId = function() {
        return this.id;
    },
    this.getEmail = function() {

    },
    this.getRole = function() {
        return "Employee";
    }
}

module.exports = Employee; 

