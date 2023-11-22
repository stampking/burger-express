
const express = require("express");
const paymentController = require("../controllers/payment-controller");
const authenticateMiddleware = require("../middlewares/authenticated");
const router = express.Router();

router.patch(
    "/update/payment-status/:orderId",
    authenticateMiddleware,
    paymentController.updatePaymentStatusById
);

module.exports = router;

