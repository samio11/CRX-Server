import { Booking } from "./booking.model";
import { Car } from "../car/car.model";
import { AppError } from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";
import { EBookingStatus } from "./booking.interface";
import { priceByDays } from "./pricePerDay";
import { calculateDays } from "./calculateDays";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { User } from "../user/user.model";
import { generateTransectionId } from "../../utils/generateTransectionId";

const createBooking = async (userId: string, payload: any) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(401, "User not found");
  const car = await Car.findById(payload.car);
  if (!car || !car.isAvailable) {
    throw new AppError(400, "Car not available");
  }
  console.log(car);
  const totalDays = calculateDays(
    new Date(payload.startDate),
    new Date(payload.endDate)
  );
  console.log(totalDays);
  if (![1, 7, 30].includes(totalDays)) {
    throw new AppError(400, "Only 1, 7 or 30 days booking allowed");
  }

  let pricePerDay: number;

  switch (car.category) {
    case "sedan":
      pricePerDay = 500;
      break;
    case "suv":
      pricePerDay = 300;
      break;
    case "hatchback":
      pricePerDay = 700;
      break;
    case "luxury":
      pricePerDay = 2000;
      break;
    case "sports":
      pricePerDay = 3000;
      break;
    case "van":
      pricePerDay = 400;
      break;
    default:
      throw new AppError(400, "Invalid car category");
  }

  const totalPrice = priceByDays(pricePerDay, totalDays);
  console.log("Total Price", totalPrice);
  const bookingPayload = {
    user: userId,
    car: car._id,
    startDate: payload.startDate,
    endDate: payload.endDate,
    totalDays,
    totalPrice,
  };
  console.log(bookingPayload);
  const booking = await Booking.create(bookingPayload);
  console.log("Booking", booking);

  await Car.findByIdAndUpdate(car._id, { isAvailable: false });

  await sendEmail({
    to: user!.email,
    subject: "Car Booking Confirmed",
    tempName: "booking-confirm",
    tempData: {
      car: car.name,
      endDate: payload.endDate,
      days: totalDays,
      price: totalPrice,
    },
  });

  return booking;
};

const cancelBooking = async (bookingId: string, userId: string) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) throw new AppError(404, "Booking not found");

  const hours = (Date.now() - booking.createdAt!.getTime()) / (1000 * 60 * 60);
  // Cant Cancel extend of 12 hours
  if (hours > 12) throw new AppError(400, "Cancellation time expired");

  booking.status = EBookingStatus.cancelled;
  await booking.save();

  await Car.findByIdAndUpdate(booking.car, { isAvailable: true });

  return booking;
};

const getAllBooking = async (query: Record<string, string>) => {
  const bookingQuery = new QueryBuilder(Booking.find(), query);
  const bookingData = bookingQuery
    .filter()
    .search([])
    .sort()
    .paginate()
    .fields();
  const [data, meta] = await Promise.all([
    await bookingData.build().populate("user").populate("car"),
    await bookingData.getMeta(),
  ]);
  return { data, meta };
};

const getABooking = async (bookingId: string) => {
  const existUser = await Booking.findById(bookingId)
    .populate("car")
    .populate("user");
  return existUser;
};

const getBookingByUser = async (userId: string) => {
  const existBooking = await Booking.find({ user: userId })
    .populate("car")
    .populate("user");
  if (!existBooking)
    throw new AppError(401, "This User Does not have any booking");
  return existBooking;
};

const completeBooking = async (bookingId: string, userId: string) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) throw new AppError(404, "Booking not found");
  if (booking.status === EBookingStatus.cancelled)
    throw new AppError(401, "Booking is already canceled");

  booking.status = EBookingStatus.completed;
  booking.paymentIntentId = await generateTransectionId();
  await booking.save();

  await Car.findByIdAndUpdate(booking.car, { isAvailable: true });

  return booking;
};

export const BookingServices = {
  createBooking,
  cancelBooking,
  getAllBooking,
  getABooking,
  getBookingByUser,
  completeBooking,
};
