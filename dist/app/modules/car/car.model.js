"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    category: {
        type: String,
        enum: ["sedan", "suv", "hatchback", "luxury", "sports", "van"],
        required: true,
    },
    fuelType: {
        type: String,
        enum: ["petrol", "diesel", "electric", "hybrid"],
        required: true,
    },
    seats: { type: Number, required: true },
    features: [{ type: String }],
    image: { type: String },
    mileage: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
exports.Car = (0, mongoose_1.model)("Car", carSchema);
