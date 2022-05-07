let validator = {}

validator.validateJoiningDate = (joiningDate) => {
    if (new Date(joiningDate) > new Date()) {
        let err = new Error("Joining date cannot be future date")
        err.status = 406 //Not acceptable
        throw err
    }
}

validator.validateemail = (email) => {
    // /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2-6})(\.[a-z]{2-3})?$/
    if (!email.match(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/)) {
        let err = new Error("Invalid email")
        err.status = 406
        throw err
    }
}

validator.validatecontact = (contact) =>{
    if(!contact.match(/^([+]\d{2})?\d{10}$/)){
        let err = new Error("Invalid contact")
        err.status = 406
        throw err
    }
}

validator.validatepassword = (password) => {
    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        let err = new Error("Invalid password")
        err.status = 406
        throw err
    }
}

// validator.validatePAN = (PAN) => {
//     if (!PAN.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/)) {
//         let err = new Error("Invalid PAN number")
//         err.status = 406
//         throw err
//     }
// }

module.exports = validator