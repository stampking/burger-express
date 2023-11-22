
// const express = require('express');
// const router = express.Router();



// router.get('/', (req, res) => {
//     const product = {
//         id: 1,
//         name: 'beef burger',
//         price: '$ 5',
//         image: 'some_url'
//     }
//     res.send(product);
// })

// router.post('/', (req, res, next) => {
//     const newProduct = req.body;
//     console.log(newProduct);
//     res.send(newProduct);
// })

// module.exports = router;

// const express = require("express");
// const orderController = require("../controllers/order-controller");
// const authenticateMiddleware = require("../middlewares/authenticated");
// const upload = require("../middlewares/upload");
// const router = express.Router();

// router.get("/", orderController.getAllOrders);
// router.post("/create", authenticateMiddleware, upload.single("slipURL"), orderController.createOrder);
// router.patch(
//     "/update",
//     authenticateMiddleware,
//     orderController.updateOrderStatusById
// );
// router.get(
//     "/:userId",
//     authenticateMiddleware,
//     orderController.getOrderByUserId
// );

// module.exports = router;

const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticateMiddleware = require("../middlewares/authenticated");
const uploadMiddleware = require("../middlewares/upload");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post(
    "/create",
    authenticateMiddleware,
    uploadMiddleware.single("slipURL"),
    orderController.createOrder
);
router.patch(
    "/update/order-status/:orderId",
    authenticateMiddleware,
    orderController.updateOrderStatusById
);
router.get(
    "/:userId",
    authenticateMiddleware,
    orderController.getOrderByUserId
);

module.exports = router;