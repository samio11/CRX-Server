import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCar = catchAsync(async (req, res, next) => {
  const payload = {
    ...req.body,
    image: req?.file?.path,
  };
  const result = await CarServices.createCar(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car Created Done for Rent",
    data: result,
  });
});
const getAllCars = catchAsync(async (req, res, next) => {
  const query = req?.query || "";
  const result = await CarServices.getAllCars(query as Record<string, string>);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car Getting Done",
    data: result,
  });
});
const getCarById = catchAsync(async (req, res, next) => {
  const { carId } = req?.params;
  const result = await CarServices.getCarById(carId);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car Get Done",
    data: result,
  });
});
const updateCar = catchAsync(async (req, res, next) => {
  const { carId } = req?.params;
  const payload = req?.body;
  const result = await CarServices.updateCar(carId, payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car Update Done",
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res, next) => {
  const { carId } = req?.params;
  const result = await CarServices.deleteCar(carId);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car Delete Done",
    data: result,
  });
});
const updateCarAvailability = catchAsync(async (req, res, next) => {
  const { carId } = req?.params;
  const { isAvailable } = req?.body;
  const result = await CarServices.updateCarAvailability(carId, isAvailable);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car Status Updated Done",
    data: result,
  });
});

export const carController = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  updateCarAvailability,
};
