"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidationSchema = exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("../user/user.interface");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Valid email is required"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    }),
});
exports.registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name is required"),
        email: zod_1.z.string().email("Valid email is required"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        phone: zod_1.z.string().min(6, "Must Give Phone Number"),
        address: zod_1.z.string(),
        role: zod_1.z.nativeEnum(user_interface_1.ERole),
        isVerified: zod_1.z.boolean().default(true),
    }),
});
