const Joi = require("joi");

const contactValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    // Other fields validation...
});

module.exports = { contactValidationSchema };