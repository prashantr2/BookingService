const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(error) {
        super();
        this.explanation = error.errors.map(err => err.message);
        this.name = 'ValidationError';
        this.msg = "Not able to validate the request data";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;
