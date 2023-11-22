
const Joi = require('joi');


const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),
    // role: Joi.string().trim().valid("ADMIN", "USER"),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

exports.loginSchema = loginSchema;
