"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../config/checkAuth");
const user_interface_1 = require("../user/user.interface");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.user]), booking_controller_1.BookingController.createBooking);
router.get("/", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), booking_controller_1.BookingController.getAllBooking);
router.get("/user", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.user]), booking_controller_1.BookingController.getBookingByUser);
router.get("/:bookingId", (0, checkAuth_1.checkAuth)([...Object.values(user_interface_1.ERole)]), booking_controller_1.BookingController.getABooking);
router.delete("/:id", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.user]), booking_controller_1.BookingController.cancelBooking);
router.post("/complete/:id", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.user]), booking_controller_1.BookingController.completeBooking);
exports.BookingRoutes = router;
