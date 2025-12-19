"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceByDays = void 0;
const AppError_1 = require("../../errors/AppError");
const priceByDays = (price, days) => {
    if (days === 1)
        return price;
    if (days === 7)
        return price * 7 * 0.95;
    if (days === 30)
        return price * 30 * 0.9;
    throw new AppError_1.AppError(400, "Invalid rental duration");
};
exports.priceByDays = priceByDays;
