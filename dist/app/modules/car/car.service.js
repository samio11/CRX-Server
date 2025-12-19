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
exports.CarServices = void 0;
const cloudinary_config_1 = require("../../config/cloudinary.config");
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const car_model_1 = require("./car.model");
const createCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.create(payload);
    return car;
});
const getAllCars = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFields = ["name", "brand", "model"];
    const carQuery = new QueryBuilder_1.QueryBuilder(car_model_1.Car.find({ isDeleted: false, isAvailable: true }), query)
        .search(searchFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield carQuery.build();
    const meta = yield carQuery.getMeta();
    return { result, meta };
});
const getCarById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findById(id);
    if (!car || car.isDeleted)
        throw new AppError_1.AppError(404, "Car not found");
    return car;
});
const updateCar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findByIdAndUpdate(id, payload, { new: true });
    if (!car)
        throw new AppError_1.AppError(404, "Car not found");
    return car;
});
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findById(id);
    if (!car)
        throw new AppError_1.AppError(404, "Car not found");
    yield (0, cloudinary_config_1.deleteImageFromCloudinary)(car.image);
    yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true, isAvailable: false });
    return { message: "Car deleted successfully" };
});
const updateCarAvailability = (id, isAvailable) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findByIdAndUpdate(id, { isAvailable }, { new: true });
    if (!car)
        throw new AppError_1.AppError(404, "Car not found");
    return car;
});
exports.CarServices = {
    updateCarAvailability,
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
};
