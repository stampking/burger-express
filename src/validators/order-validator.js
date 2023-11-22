
const Joi = require("joi");

const createOrderSchema = Joi.object({
    // orderId: Joi.number().integer().positive().required(),
    totalAmount: Joi.number().positive().required(),
    slipURL: Joi.string(),
    orderStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
    paymentStatus: Joi.string().trim().valid("PROCESSING", "PAID"),
    orderItems: Joi.string(),
});

const updateOrderStatusSchema = Joi.object({
    // orderId: Joi.number().integer().positive().required(),
    orderStatus: Joi.string().trim().valid("COOKING", "COMPLETE"),
});

const getOrderByUserIdSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});

module.exports = {
    createOrderSchema,
    updateOrderStatusSchema,
    getOrderByUserIdSchema,
};