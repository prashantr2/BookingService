class AppError extends Error {
    constructor(name, msg, explanation, statusCode) {
        super();
        this.explanation = explanation;
        this.name = name;
        this.msg = msg;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;

