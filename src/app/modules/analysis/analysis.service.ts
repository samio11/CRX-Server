import { Booking } from "../booking/booking.model";
import { Car } from "../car/car.model";
import { User } from "../user/user.model";
import { EBookingStatus } from "../booking/booking.interface";

const getAdminAnalysis = async () => {
  const [totalUsers, totalCars, totalBookings] = await Promise.all([
    User.countDocuments(),
    Car.countDocuments({ isDeleted: false }),
    Booking.countDocuments(),
  ]);

  const bookingStatus = await Booking.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const mostRentedCar = await Booking.aggregate([
    {
      $group: {
        _id: "$car",
        totalBookings: { $sum: 1 },
      },
    },
    { $sort: { totalBookings: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: "cars",
        localField: "_id",
        foreignField: "_id",
        as: "car",
      },
    },
    { $unwind: "$car" },
  ]);

  const monthlyRevenue = await Booking.aggregate([
    { $match: { status: EBookingStatus.completed } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        revenue: { $sum: "$totalPrice" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const carAvailability = await Car.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$isAvailable",
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    totalUsers,
    totalCars,
    totalBookings,
    bookingStatus,
    mostRentedCar: mostRentedCar[0] || null,
    monthlyRevenue,
    carAvailability,
  };
};

export const AdminService = {
  getAdminAnalysis,
};
