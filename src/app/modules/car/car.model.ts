import { model, Schema } from "mongoose";
import { ICar } from "./car.interface";

const carSchema = new Schema<ICar>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    category: {
      type: String,
      enum: ["sedan", "suv", "hatchback", "luxury", "sports", "van"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
      required: true,
    },
    seats: { type: Number, required: true },
    features: [{ type: String }],
    image: { type: String },
    mileage: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Car = model<ICar>("Car", carSchema);
