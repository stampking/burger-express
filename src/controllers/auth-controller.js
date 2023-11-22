const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validators/auth-validator');
const prisma = require('../models/prisma');
const createError = require('../utils/create-error');
// const createError = require('../utils/create-error');

exports.register = async (req, res, next) => {

    try {
        const { value, error } = registerSchema.validate(req.body);
        // console.log("value", value)
        // console.log("error", error)
        if (error) {
            error.statusCode = 400;
            return next(error);
        }

        value.password = await bcrypt.hash(value.password, 12);
        value.email = value.email ? value.email : undefined;
        value.mobile = value.mobile ? value.mobile : undefined;

        const user = await prisma.user.create({
            data: value,
        });

        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'asdfghjkloiuytrrewq', { expiresIn: process.env.JWT_EXPIRE });

        delete user.password;
        res.status(201).json({ accessToken, user });

    } catch (err) {
        next(err);
    }
};

// exports.login = async (req, res, next) => {
//     try {
//         const { value, error } = loginSchema.validate(req.body);
//         if (error) {
//             return next(error);
//         }
//         const user = await prisma.user.findFirst({
//             where: {
//                 OR: [
//                     { email: value.email }
//                 ]
//             }
//         });
//         if (!user) {
//             return next(createError('invalid credential', 400));
//         }
//     } catch (error) {
//         next(error)
//     }
// }

exports.login = async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const user = await prisma.user.findFirst({
            where: {
                email: value.email,
            },
        });
        if (!user) {
            return next(createError("invalid credential", 400));
        }
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return next(createError("invalid credential", 400));
        }
        const payload = { userId: user.id };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY || "mimknjubybyvtcrcexg",
            { expiresIn: process.env.JWT_EXPIRE }
        );
        delete user.password;
        res.status(200).json({ accessToken, user });
    } catch (err) {
        next(err);
    }
};

exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user });
};

