const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode ? res.statusCode: 500;
    switch (statuscode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed",
                message: err.message,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
            });

        case constants.UNAUTHORISED:
            res.json({
                title: "Unauthorised",
                message: err.message,
            });
        case constants.FORBIDDEN:
            res.join({
                title:"Access Forbidden",
                message: "Unauthorized action",
            })

        default:
            console.log(err.message);
            break;
    }

    }


module.exports = errorHandler