"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const booking_model_1 = require("./booking.model");
const car_model_1 = require("../car/car.model");
const sendEmail_1 = require("../../utils/sendEmail");
const booking_interface_1 = require("./booking.interface");
node_cron_1.default.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    // Notify before 1 day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const endingBookings = yield booking_model_1.Booking.find({
        endDate: { $lte: tomorrow },
        status: booking_interface_1.EBookingStatus.active,
    }).populate("user");
    for (const booking of endingBookings) {
        yield (0, sendEmail_1.sendEmail)({
            to: booking.user.email,
            subject: "Rental Ending Soon",
            tempName: "booking-ending",
        });
    }
    // Auto complete & available
    const completed = yield booking_model_1.Booking.find({
        endDate: { $lt: today },
        status: booking_interface_1.EBookingStatus.active,
    });
    for (const booking of completed) {
        booking.status = booking_interface_1.EBookingStatus.completed;
        yield booking.save();
        yield car_model_1.Car.findByIdAndUpdate(booking.car, { isAvailable: true });
    }
}));
