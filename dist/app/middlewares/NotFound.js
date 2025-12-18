"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const NotFound = (err, req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API not found",
        error: "",
    });
};
exports.NotFound = NotFound;
