const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)
const url = 'mongodb://localhost:27017/EmployeeDB'

let schema = {
    "empName": {
        type: String,
        required: true,
        unique: true
    },
    "empId": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "contact": {
        type: String,
        required: true
    },
    "address": {
        type: String,
        required: true
    },
    "joiningDate": {
        type: Date,
        required: true
    }
}



let employeeSchema = new Schema(schema, { collection: "Employee", timestamps: true })

let connection = {}
connection.getCollection = async() => {
    try {
        return (await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })).model("Employee", employeeSchema)
    } catch (err) {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    }
}

module.exports = connection