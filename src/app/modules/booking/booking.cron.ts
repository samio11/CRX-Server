import cron from "node-cron";
import { Booking } from "./booking.model";
import { Car } from "../car/car.model";
import { sendEmail } from "../../utils/sendEmail";
import { EBookingStatus } from "./booking.interface";

cron.schedule("0 0 * * *", async () => {
  const today = new Date();

  // Notify before 1 day
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const endingBookings = await Booking.find({
    endDate: { $lte: tomorrow },
    status: EBookingStatus.active,
  }).populate("user");

  for (const booking of endingBookings) {
    await sendEmail({
      to: (booking.user as any).email,
      subject: "Rental Ending Soon",
      tempName: "booking-ending",
    });
  }

  // Auto complete & available
  const completed = await Booking.find({
    endDate: { $lt: today },
    status: EBookingStatus.active,
  });

  for (const booking of completed) {
    booking.status = EBookingStatus.completed;
    await booking.save();
    await Car.findByIdAndUpdate(booking.car, { isAvailable: true });
  }
});
