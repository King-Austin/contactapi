const Joi = require("joi");

const contactValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string': 'Please enter a valid email address.',
        'any.required': 'Name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
    phone: Joi.number().required().messages({
        'string': 'Please enter a valid phone number.',
        'any.required': 'phone is required.',
    }),
    // Other fields validation...
});

module.exports = { contactValidationSchema };