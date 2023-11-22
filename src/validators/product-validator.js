
const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().trim().required(),
    amount: Joi.number().integer().positive().required(),
    price: Joi.number().integer().required(),
    image: Joi.string().trim().required(),

});

const updateProductSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
    name: Joi.string().trim(),
    amount: Joi.number().integer().positive(),
    price: Joi.number().integer().required(),
})





const deleteProductSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
});

module.exports = {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
};