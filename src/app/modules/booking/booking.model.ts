import { Schema, model } from "mongoose";
import { IBooking, EBookingStatus } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(EBookingStatus),
      default: EBookingStatus.active,
    },
    paymentIntentId: String,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
