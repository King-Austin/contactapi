const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode: 500;
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
                title:"Access Forbidden"
            })

        default:
            console.log("No Error, all good mate ");
            break;
    }

    }


module.exports = errorHandler