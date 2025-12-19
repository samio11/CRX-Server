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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const booking_model_1 = require("./booking.model");
const car_model_1 = require("../car/car.model");
const AppError_1 = require("../../errors/AppError");
const sendEmail_1 = require("../../utils/sendEmail");
const booking_interface_1 = require("./booking.interface");
const pricePerDay_1 = require("./pricePerDay");
const calculateDays_1 = require("./calculateDays");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const user_model_1 = require("../user/user.model");
const generateTransectionId_1 = require("../../utils/generateTransectionId");
const createBooking = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user)
        throw new AppError_1.AppError(401, "User not found");
    const car = yield car_model_1.Car.findById(payload.car);
    if (!car || !car.isAvailable) {
        throw new AppError_1.AppError(400, "Car not available");
    }
    console.log(car);
    const totalDays = (0, calculateDays_1.calculateDays)(new Date(payload.startDate), new Date(payload.endDate));
    console.log(totalDays);
    if (![1, 7, 30].includes(totalDays)) {
        throw new AppError_1.AppError(400, "Only 1, 7 or 30 days booking allowed");
    }
    let pricePerDay;
    switch (car.category) {
        case "sedan":
            pricePerDay = 500;
            break;
        case "suv":
            pricePerDay = 300;
            break;
        case "hatchback":
            pricePerDay = 700;
            break;
        case "luxury":
            pricePerDay = 2000;
            break;
        case "sports":
            pricePerDay = 3000;
            break;
        case "van":
            pricePerDay = 400;
            break;
        default:
            throw new AppError_1.AppError(400, "Invalid car category");
    }
    const totalPrice = (0, pricePerDay_1.priceByDays)(pricePerDay, totalDays);
    console.log("Total Price", totalPrice);
    const bookingPayload = {
        user: userId,
        car: car._id,
        startDate: payload.startDate,
        endDate: payload.endDate,
        totalDays,
        totalPrice,
    };
    console.log(bookingPayload);
    const booking = yield booking_model_1.Booking.create(bookingPayload);
    console.log("Booking", booking);
    yield car_model_1.Car.findByIdAndUpdate(car._id, { isAvailable: false });
    yield (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: "Car Booking Confirmed",
        tempName: "booking-confirm",
        tempData: {
            car: car.name,
            endDate: payload.endDate,
            days: totalDays,
            price: totalPrice,
        },
    });
    return booking;
});
const cancelBooking = (bookingId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findOne({ _id: bookingId, user: userId });
    if (!booking)
        throw new AppError_1.AppError(404, "Booking not found");
    const hours = (Date.now() - booking.createdAt.getTime()) / (1000 * 60 * 60);
    // Cant Cancel extend of 12 hours
    if (hours > 12)
        throw new AppError_1.AppError(400, "Cancellation time expired");
    booking.status = booking_interface_1.EBookingStatus.cancelled;
    yield booking.save();
    yield car_model_1.Car.findByIdAndUpdate(booking.car, { isAvailable: true });
    return booking;
});
const getAllBooking = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingQuery = new QueryBuilder_1.QueryBuilder(booking_model_1.Booking.find(), query);
    const bookingData = bookingQuery
        .filter()
        .search([])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        yield bookingData.build().populate("user").populate("car"),
        yield bookingData.getMeta(),
    ]);
    return { data, meta };
});
const getABooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield booking_model_1.Booking.findById(bookingId);
    return existUser;
});
const getBookingByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existBooking = yield booking_model_1.Booking.find({ user: userId });
    if (!existBooking)
        throw new AppError_1.AppError(401, "This User Does not have any booking");
    return existBooking;
});
const completeBooking = (bookingId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findOne({ _id: bookingId, user: userId });
    if (!booking)
        throw new AppError_1.AppError(404, "Booking not found");
    if (booking.status === booking_interface_1.EBookingStatus.cancelled)
        throw new AppError_1.AppError(401, "Booking is already canceled");
    booking.status = booking_interface_1.EBookingStatus.completed;
    booking.paymentIntentId = yield (0, generateTransectionId_1.generateTransectionId)();
    yield booking.save();
    yield car_model_1.Car.findByIdAndUpdate(booking.car, { isAvailable: true });
    return booking;
});
exports.BookingServices = {
    createBooking,
    cancelBooking,
    getAllBooking,
    getABooking,
    getBookingByUser,
    completeBooking,
};
