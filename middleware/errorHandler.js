const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "Validation Failed",
                message: err.message,
            });
            break; //break and return
        case constants.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
            });
            break; //break and return
        case constants.UNAUTHORISED:
            res.status(statusCode).json({
                title: "Unauthorised",
                message: err.message,
            });
            break; //break and return
        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title: "Access Forbidden",
                message: "Unauthorized action",
            });
            break; //break and return
        default:
            console.error(err.message, err.stack); // Log the error message
            res.status(statusCode).json({
                title: "Internal Server Error",
                message: "Oops, Something went wrong",
            });
            break; //break and return
    }
};

module.exports = errorHandler;