import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Car } from "./car.model";

const createCar = async (payload: any) => {
  const car = await Car.create(payload);
  return car;
};

const getAllCars = async (query: Record<string, string>) => {
  const searchFields = ["name", "brand", "model"];
  const carQuery = new QueryBuilder(
    Car.find({ isDeleted: false, isAvailable: true }),
    query
  )
    .search(searchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.build();
  const meta = await carQuery.getMeta();
  return { result, meta };
};

const getCarById = async (id: string) => {
  const car = await Car.findById(id);
  if (!car || car.isDeleted) throw new AppError(404, "Car not found");
  return car;
};

const updateCar = async (id: string, payload: any) => {
  const car = await Car.findByIdAndUpdate(id, payload, { new: true });
  if (!car) throw new AppError(404, "Car not found");
  return car;
};

const deleteCar = async (id: string) => {
  const car = await Car.findById(id);
  if (!car) throw new AppError(404, "Car not found");

  await deleteImageFromCloudinary(car.image);

  await Car.findByIdAndUpdate(id, { isDeleted: true, isAvailable: false });
  return { message: "Car deleted successfully" };
};

const updateCarAvailability = async (id: string, isAvailable: boolean) => {
  const car = await Car.findByIdAndUpdate(id, { isAvailable }, { new: true });
  if (!car) throw new AppError(404, "Car not found");
  return car;
};

export const CarServices = {
  updateCarAvailability,
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
