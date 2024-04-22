const { MISSING_A_REQUIRED_PARAMETER } = require('../config/http_status_code')
const mongoose = require("mongoose");

class CustomError extends Error {
    constructor(obj) {
        super(obj.message);
        this.statusCode = obj.statusCode;
        this.message = obj.message;
    }
}

const hasRequiredFields = (document, requiredFields) => {
    for (const field of requiredFields) {
        if (!(field in document)) {
            throw new CustomError({ statusCode: MISSING_A_REQUIRED_PARAMETER, message: `${field} is required` });
        }
    }
}   


const validateUsersArray = (users) => {
    for (const user of users) {
        if (!mongoose.Types.ObjectId.isValid(user)) {
            throw new CustomError({ statusCode: MISSING_A_REQUIRED_PARAMETER, message: `Invalid user in the array: ${JSON.stringify(user)}` });
        }
    }
}


module.exports = { CustomError, validateUsersArray, hasRequiredFields };