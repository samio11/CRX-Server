"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDays = void 0;
const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
        throw new Error("End date must be greater than start date");
    }
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
exports.calculateDays = calculateDays;
