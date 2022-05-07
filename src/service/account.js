const dbLayer = require("../model/account")
const validator = require("../utilities/validator")

let service = {}

service.insertScript = async() => {
    let data = await dbLayer.insertScript();
    return data;
}

service.getUserDetailByName = async(empname) => {
    let data = await dbLayer.getUserDetailByName(empname);
    if(data){
        return data
    } else {
        let err = new Error("User not found")
        err.status = 404
        throw err
    }
}

service.getUserDetailById = async(empId) => {
    let data = await dbLayer.getUserDetailById(empId);
    if(data){
        return data
    } else {
        let err = new Error("User not found")
        err.status = 404
        throw err
    }
}

service.getEmployees = async()=> {
    let data = await dbLayer.getEmployees();
    if(data){
        return data
    }
}

service.createAccount = async(empObj) => {
    //validator.validatePAN(accountObj.PAN);
    validator.validateemail(empObj.email);
    validator.validatepassword(empObj.password);
    validator.validatecontact(empObj.contact);
    validator.validateJoiningDate(empObj.joiningDate);
    let data = await dbLayer.getUser(empObj.empName);
    if (data) {
        let err = new Error("User already exists")
        err.status = 406
        throw err
    } else {
        let empData = await dbLayer.createAccount(empObj);
        if (empData) {
            return empData
        } else {
            let err = new Error("Account not created")
            err.status = 500
            throw err;
        }
    }
}

service.editEmployees = async(empName, empObj) => {
    let data = await dbLayer.editEmployees(empName,empObj);
    if(data){
        return data;
    } else {
        let err = new Error("User details not updated")
        err.status = 400
        throw err
    }
}

service.deleteUserByName = async(empName) => {
    let data = await dbLayer.deleteUserByName(empName);
    if(data) {
        let err = new Error("No user found or operation failed");
        err.status = 500;
        throw err;
    }
    else {
        return empName
    }
}

service.deleteUserById = async(empId) => {
    let data = await dbLayer.deleteUserById(empId);
    if(data) {
        let err = new Error("No user found or operation failed");
        err.status = 500;
        throw err;
    }
    else {
        return empId
    }
}


module.exports = service