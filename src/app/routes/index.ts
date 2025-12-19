import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { carRoutes } from "../modules/car/car.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

export const rootRouter = Router();

const excludingModule = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/user",
    element: userRoutes,
  },
  {
    path: "/car",
    element: carRoutes,
  },
  {
    path: "/booking",
    element: BookingRoutes,
  },
];

excludingModule.forEach((x) => rootRouter.use(x.path, x.element));
