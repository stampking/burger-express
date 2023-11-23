


const prisma = require("../models/prisma");
// const createError = require("../utils/create-error");
const {
    createOrderSchema,
    updateOrderStatusSchema,
    getOrderByUserIdSchema,
} = require("../validators/order-validator");
const { upload } = require("../utils/cloundinary-service");


exports.createOrder = async (req, res, next) => {
    try {
        console.log("reqBody", req.body)

        if (req.file) {
            req.body.slipURL = await upload(req.file.path);
        }

        const { value, error } = createOrderSchema.validate(req.body);

        if (error) {
            error.statusCode = 400;
            return next(error);
        }
        console.log("value", value)

        // value.orderDetail = JSON.parse(value.orderDetail);
        // console.log("orderDetail");
        // value.orderItems = JSON.parse(value.orderItems);
        // console.log(value.orderItems);

        /* Called when press Btn-Submit */
        console.log(req.user.id, "log User")
        const createOrderProduct = await prisma.order.create({
            data: {
                // userId: +req.user.id,
                userId: req.user.id,
                totalAmount: "200",
                slipURL: value.slipURL,
                createdAt: value.createdAt,
                orderStatus: value.orderStatus,
                paymentStatus: value.paymentStatus,
                updateAt: value.updateAt,
                orderItems: {
                    create: {
                        productId: +value.itemId,
                        quantity: 1
                    },
                },
            },
            include: {
                orderItems: true,
            }
        });
        res.status(201).json({ createOrderProduct });
    } catch (error) {
        console.log(error)
        next(error);
    }
};




exports.updateOrderStatusById = async (req, res, next) => {
    try {
        const { value, error } = updateOrderStatusSchema.validate(req.body);
        console.log("value", value)
        if (error) {
            error.statusCode = 400;
            return next(error);
        }

        const order = await prisma.order.findFirst({
            where: {
                id: value.orderId,
            },
        });

        if (!order) {
            const error = new Error("order not found");
            error.statusCode = 400;

            return next(error);
        }

        const editStatus = await prisma.order.update({
            data: {
                orderStatus: value.orderStatus,
            },
            where: {
                id: +req.params.orderId,
            },
        });

        res.status(201).json({ editStatus });
    } catch (error) {
        next(error);
    }
};

exports.getOrderByUserId = async (req, res, next) => {
    try {

        const { userId } = req.params
        console.log(userId)
        const { value, error } = getOrderByUserIdSchema.validate(req.params);

        if (error) {
            error.statusCode = 400;
            return next(error);
        }

        const response = await prisma.order.findMany({
            where: {
                userId: +req.params.userId,
            },
            select: {
                id: true,
                totalAmount: true,
                slipURL: true,
                orderStatus: true,
                paymentStatus: true,
                orderItems: {
                    select: {

                        product: {
                            select: {

                                name: true,
                            },
                        },
                        quantity: true,
                    }
                },
            },
        });

        console.log("response", response);

        if (!response) {
            const error = new Error("order not found");
            error.statusCode = 400;

            return next(error);
        }

        const order = [];

        if (response?.length > 0) {
            response.map((el) => {
                // console.log("element", el);
                el.orderItems.forEach((item, index) => {
                    const result = {
                        id: index === 0 ? el.id : "",
                        totalAmount: el.totalAmount,
                        slipURL: index === 0 ? el.slipURL : "",
                        orderStatus: index === 0 ? el.orderStatus : "",
                        paymentStatus: index === 0 ? el.paymentStatus : "",
                        name: item.product.name,
                        quantity: item.quantity,
                    };
                    // console.log(result);
                    order.push(result);
                });
            });
        }

        res.status(201).json({ order });
    } catch (error) {
        next(error);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const response = await prisma.order.findMany({
            select: {
                id: true,
                totalAmount: true,
                slipURL: true,
                orderStatus: true,
                paymentStatus: true,
                orderItems: {
                    select: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });
        console.log('response', response)
        if (!response) {
            const error = new Error("order not found");
            error.statusCode = 400;

            return next(error);
        }

        const orders = [];

        if (response?.length > 0) {
            response.map((el) => {
                if (el.orderItems?.length > 0) {
                    el.orderItems.forEach((item, index) => {
                        orders.push({
                            id: index === 0 ? el.id : "",
                            totalPrice: index === 0 ? el.totalPrice : "",
                            slipURL: index === 0 ? el.slipURL : "",
                            orderStatus: index === 0 ? el.orderStatus : "",
                            paymentStatus: index === 0 ? el.paymentStatus : "",
                            name: item.product.name,
                            quantity: item.quantity,
                        });
                    });
                }
            });
        }

        res.status(201).json({ orders });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



