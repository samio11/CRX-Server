import { BookingServices } from "./booking.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await BookingServices.createBooking(userId, payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User Booked Car",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const { id } = req.user;
  const result = await BookingServices.cancelBooking(bookingId, id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Delete Car",
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BookingServices.getAllBooking(
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin Getting Car",
    data: result,
  });
});
const getABooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.getABooking(bookingId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Getting a Car",
    data: result,
  });
});
const getBookingByUser = catchAsync(async (req, res) => {
  const { id } = req.user as JwtPayload;
  const result = await BookingServices.getBookingByUser(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Getting Cars",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  cancelBooking,
  getAllBooking,
  getABooking,
  getBookingByUser,
};
