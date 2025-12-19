"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const analysis_controller_1 = require("./analysis.controller");
const checkAuth_1 = require("../../config/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.get("/", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), analysis_controller_1.analysisController.getAdminAnalysis);
exports.AdminRoutes = router;
