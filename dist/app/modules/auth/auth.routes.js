"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const parseFormData_1 = require("../../middlewares/parseFormData");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.authController.userLogin);
router.post("/register", multer_config_1.multerUpload.single("file"), parseFormData_1.parseFormData, (0, validateRequest_1.default)(auth_validation_1.registerValidationSchema), auth_controller_1.authController.userRegister);
router.post("/logout", auth_controller_1.authController.userLogout);
exports.authRoutes = router;
