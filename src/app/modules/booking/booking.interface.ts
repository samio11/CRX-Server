import { Types } from "mongoose";

export enum EBookingStatus {
  active = "active",
  completed = "completed",
  cancelled = "cancelled",
}

export interface IBooking {
  user: Types.ObjectId;
  car: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  totalPrice: number;
  status: EBookingStatus;
  paymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
