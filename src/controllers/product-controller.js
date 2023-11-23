const prisma = require("../models/prisma");
const { upload } = require("../utils/cloundinary-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");
const { createProductSchema, updateProductSchema, deleteProductSchema } = require('../validators/product-validator');
const { response } = require("express");




exports.getAllProducts = async (req, res, next) => {
    try {
        const product = await prisma.product.findMany({});
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}


exports.createProducts = async (req, res, next) => {

    try {
        if (req.user.role !== "ADMIN") {
            console.log(req.user.role)
            return res.status(401).json({ message: "unauthenticate" });
        }
        // const { name, price, description } = req.body;
        // const data = {};
        if (req.file) {
            req.body.image = await upload(req.file.path);
        }
        const { value, error } = createProductSchema.validate(req.body);
        console.log("value", value)

        if (error) {
            error.statusCode = 400;
            return next(error);
        }
        // if (name) {
        //     data.name = name;
        // }

        // if (price) {
        //     data.price = price;
        // }
        // if (description) {
        //     data.description = description;
        // }
        const createProduct = await prisma.product.create({
            data: value,
        })
        res.status(201).json({ createProduct })
    }
    catch (err) {
        next(err)

    } finally {
        if (req.file) {
            fs.unlink(req.file.path);
        }
    }

    // console.log(req.user);
    // finally {
    //     if (req.file) {
    //         fs.unlink(req.file.path);
    //     }
    // }

};

exports.updateProduct = async (req, res, next) => {
    try {
        const { value, error } = updateProductSchema.validate(req.body);

        if (error) {
            error.statusCode = 400;
            return next(error);
        }

        const updateProduct = await prisma.product.update({
            data: {
                name: value.name,
                amount: value.amount,
                price: value.price,
            },
            where: {
                id: value.productId,
            },
        });

        res.status(201).json({ updateProduct });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { value, error } = deleteProductSchema.validate(req.params);
        // console.log(value);

        if (error) {
            error.statusCode = 400;
            return next(error);
        }

        const deleteProduct = await prisma.product.delete({
            where: {
                id: value.productId,
            },
        });

        res.status(201).json({ deleteProduct });
    } catch (error) {
        next(error);
    }
};

// exports.getAllProducts = async (req, res, next) => {
//     try {
//         const response = await prisma.product.findMany({
//             select: {
//                 id: true,
//                 name: true,
//                 image: true,
//                 price: true,
//                 amount: true,
//                 productStatus: true,
//             },
//         });


//         let products = [...response];
//         products.map((product) => {
//             if (product.productStatus === "NOTAVAILABLE") {
//                 product.productStatus = "NOT AVAITLABLE";
//             }
//             return product;
//         })
//         res.status(200).json({ products });
//     } catch (error) {
//         next(error);
//     }
// };

exports.updateStatusProductById = async (req, res, next) => {
    try {
        console.log(req.params);
        const status = await prisma.product.update({
            data: {
                productStatus: req.body.productStatus,
            },
            where: {
                id: +req.params.productId,
            },

        });

        res.status(200).json({ status });
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {

        const { productId } = req.params
        console.log('hello', productId)
        const productById = await prisma.product.findFirst({
            where: {
                id: +productId
            }
        })
        res.json({ productById })
    } catch (error) {
        next(error)
    }
}