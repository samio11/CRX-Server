"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const car_routes_1 = require("../modules/car/car.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const analysis_routes_1 = require("../modules/analysis/analysis.routes");
exports.rootRouter = (0, express_1.Router)();
const excludingModule = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/user",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/car",
        element: car_routes_1.carRoutes,
    },
    {
        path: "/booking",
        element: booking_routes_1.BookingRoutes,
    },
    {
        path: "/analysis",
        element: analysis_routes_1.AdminRoutes,
    },
];
excludingModule.forEach((x) => exports.rootRouter.use(x.path, x.element));
