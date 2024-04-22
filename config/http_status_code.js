// httpStatusCodes.js

const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    MISSING_A_REQUIRED_PARAMETER:422,
    GONE:410 ,
    NOT_ACCEPTABLE:406,
    SERVICE_UNAVAILABLE:503
   }
   
   module.exports = httpStatusCodes