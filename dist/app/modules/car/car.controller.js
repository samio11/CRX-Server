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
exports.carController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const car_service_1 = require("./car.service");
const createCar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req.body), { image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path });
    const result = yield car_service_1.CarServices.createCar(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Car Created Done for Rent",
        data: result,
    });
}));
const getAllCars = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req === null || req === void 0 ? void 0 : req.query) || "";
    const result = yield car_service_1.CarServices.getAllCars(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Car Getting Done",
        data: result,
    });
}));
const getCarById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield car_service_1.CarServices.getCarById(carId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Car Get Done",
        data: result,
    });
}));
const updateCar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req === null || req === void 0 ? void 0 : req.params;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield car_service_1.CarServices.updateCar(carId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Car Update Done",
        data: result,
    });
}));
const deleteCar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield car_service_1.CarServices.deleteCar(carId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Car Delete Done",
        data: result,
    });
}));
const updateCarAvailability = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req === null || req === void 0 ? void 0 : req.params;
    const { isAvailable } = req === null || req === void 0 ? void 0 : req.body;
    const result = yield car_service_1.CarServices.updateCarAvailability(carId, isAvailable);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Car Status Updated Done",
        data: result,
    });
}));
exports.carController = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
    updateCarAvailability,
};
