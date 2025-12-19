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
exports.AdminService = void 0;
const booking_model_1 = require("../booking/booking.model");
const car_model_1 = require("../car/car.model");
const user_model_1 = require("../user/user.model");
const booking_interface_1 = require("../booking/booking.interface");
const getAdminAnalysis = () => __awaiter(void 0, void 0, void 0, function* () {
    const [totalUsers, totalCars, totalBookings] = yield Promise.all([
        user_model_1.User.countDocuments(),
        car_model_1.Car.countDocuments({ isDeleted: false }),
        booking_model_1.Booking.countDocuments(),
    ]);
    const bookingStatus = yield booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);
    const mostRentedCar = yield booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: "$car",
                totalBookings: { $sum: 1 },
            },
        },
        { $sort: { totalBookings: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: "cars",
                localField: "_id",
                foreignField: "_id",
                as: "car",
            },
        },
        { $unwind: "$car" },
    ]);
    const monthlyRevenue = yield booking_model_1.Booking.aggregate([
        { $match: { status: booking_interface_1.EBookingStatus.completed } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                revenue: { $sum: "$totalPrice" },
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    const carAvailability = yield car_model_1.Car.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: "$isAvailable",
                count: { $sum: 1 },
            },
        },
    ]);
    return {
        totalUsers,
        totalCars,
        totalBookings,
        bookingStatus,
        mostRentedCar: mostRentedCar[0] || null,
        monthlyRevenue,
        carAvailability,
    };
});
exports.AdminService = {
    getAdminAnalysis,
};
