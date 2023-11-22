
const prisma = require("../models/prisma");


const {
    updatePaymentStatusSchema,
} = require("../validators/payment-validator");

exports.updatePaymentStatusById = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const { value, error } = updatePaymentStatusSchema.validate(req.body);

        if (error) {

            error.statusCode = 400;
            return next(error);
        }

        const order = await prisma.order.findFirst({
            where: {
                id: +orderId,
            },
        });

        if (!order) {
            const error = new Error("order not found");
            error.statusCode = 400;

            return next(error);
        }

        const editStatus = await prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                paymentStatus: value.paymentStatus
            }
        });

        res.status(201).json({ editStatus });
    } catch (error) {
        next(error);
    }
};