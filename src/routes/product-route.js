const express = require('express')
const router = express.Router()
const productController = require("../controllers/product-controller")
const uploadMiddleware = require('../middlewares/upload');
const authenticated = require('../middlewares/authenticated');


router.get("/allProducts", productController.getAllProducts)
// router.post("/product", productController.createProducts)
router.get("/", productController.getAllProducts);
router.post("/create", authenticated, uploadMiddleware.single("image"), productController.createProducts);
router.patch("/update", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);
router.patch("/update/product-status/:productId", productController.updateStatusProductById);


module.exports = router;