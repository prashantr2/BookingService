const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        msg="Something went wrong", 
        explanation="Service layer error", 
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = 'ServiceError';
        this.msg = msg;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = ServiceError;