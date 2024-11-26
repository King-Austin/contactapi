const Joi = require("joi");

const userValidationSchema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(30),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(10),
    password: Joi.required()

    // Other fields validation...
});

module.exports = { userValidationSchema };