// errorHandlingMiddleware.js

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const error = err.message || err
    if (err.statusCode == undefined) {
        res.status(500).json({error:err.message==undefined?err:err.message});
    } else {
        res.status(statusCode).json({ error: error });

    }     
}

module.exports = errorHandler;