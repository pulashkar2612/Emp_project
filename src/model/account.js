const initialData = require("./data.json")
const connection = require("../utilities/connection")

let createConnection = async() => {
    collection = await connection.getCollection();
}

let model = {}
model.insertScript = async() => {
    await collection.deleteMany();
    let response = await collection.insertMany(initialData);
    if (response && response.length > 0) {
        return response.length
    } else {
        let err = new Error("Script insertion failed")
        err.status = 500
        throw new Error
    }
}

// model.generateId = async() => {
//     let empId = await collection.distinct("empId")
//     let newId = Math.max(...tid)
//     return newId > 0 ? newId+1 : 1001
// }

model.getUser = async(empName) => {
    let empData = await collection.findOne({ empName: empName }, { _id: 0, empName: 1, empId: 1, password:1 })
    return empData;
}

model.getEmployees = async() => {
    let empData = await collection.find({},{ _id: 0, __v: 0, createdAt:0, updatedAt:0 })
    return empData;
}

model.getUserDetailByName = async(empName) => {
    let empData = await collection.findOne({ empName: empName },{ _id: 0, __v: 0, createdAt:0, updatedAt:0 })
    return empData;

}

model.getUserDetailById = async(empId) => {
    let empData = await collection.findOne({ empId: empId },{ _id: 0, __v: 0, createdAt:0, updatedAt:0 })
    return empData;

}

model.createAccount = async(empObj) => {
    let empData = await collection.create(empObj)
    return empData ? true : false;
}

model.editEmployees = async(empName, empObj) => {
    let response = await collection.updateOne({ empName: empName }, {$set: empObj})
    if(response.nModified > 0)
        return empObj;
    else
        return null;  
}    

model.deleteUserByName = async(empName) => {
    let responseData = await collection.deleteOne({ empName: empName });
    if(responseData.deleteCount > 0) 
        return empName
    else 
        return null
}

model.deleteUserById = async(empId) => {
    let responseData = await collection.deleteOne({ empId: empId });
    if(responseData.deleteCount > 0) 
        return empId
    else 
        return null
}

createConnection();
module.exports = model