const express = require('express');
const routing = express.Router();
const service = require("../service/account");

//Router to setup DB.
routing.get("/setupDB", async(req, res, next) => {
    try {
        let data = await service.insertScript();  // data =3 here as 3 initial documents inserted.
        if (data) {
            res.status(201)
            res.json({ message: "Inserted " + data + " document in database" })
        }
    } catch (err) { next(err) }
})

//--------------------------------------------------------------------------------------
//Rpiting to get all employees------------------ //READ ALL
routing.get('/accounts', async(req,res,next) => {
    try {
        let userDetails = await service.getEmployees()
        res.status(200);
        res.json(userDetails)
    } catch(err) {
        next(err)
    }
})

//---------------------------------------------------------------------------------------
//Routing to get emp detail using name-------------------   //READ ONE
routing.get('/accounts/:empName', async(req,res,next) => {
    let empName = req.params.empName;
    try {
        let empDetails = await service.getUserDetailByName(empName)
        res.status(200);
        res.json(empDetails)
    } catch(err) {
        next(err)
    }
})

routing.get('/account/:empId', async(req,res,next) => {
    let empId = req.params.empId;
    try {
        let empDetails = await service.getUserDetailById(empId)
        res.status(200);
        res.json(empDetails)
    } catch(err) {
        next(err)
    }
})

//---------------------------------------------------------------------------------------
//Routing to create new account for user    // CREATE NEW USER
routing.post("/accounts", async(req, res, next) => {
    let accountObj = req.body
    try {
        let accountData = await service.createAccount(accountObj);
        res.json({ message: "New Employee Added Successfully" })
    } catch (err) { next(err) }
})

//---------------------------------------------------------------------------------------
//Routing to delete user--------------- //DELETE A USER
routing.delete("/accounts/:empName", async(req, res, next) => {
    let empName = req.params.empName
    try{
        empName = await service.deleteUserByName(empName)
        res.json({ message: "Employee removed with empname " + empName })
    } catch (err) { next(err) }
})

routing.delete("/account/:empId", async(req, res, next) => {
    let empId = req.params.empId
    try{
        empId = await service.deleteUserById(empId)
        res.json({ message: "Employee removed with empId " + empId })
    } catch (err) { next(err) }
})


//-------------------------------------------------------------------------------------
//Routing to edit existing user-------------//EDIT EMPLOYEE
routing.put('/accounts/:empname', async(req,res,next) => {
    let empObj = req.body
    console.log(empObj);
    let empname = req.params.empname
    try {
        let data = await service.editEmployees(empname, empObj)
        res.json({message: "Employee "+ empname +" updated"});
    } catch (err) { next(err) }
})

module.exports = routing;