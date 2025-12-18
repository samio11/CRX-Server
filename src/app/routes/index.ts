import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { carRoutes } from "../modules/car/car.routes";

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
];

excludingModule.forEach((x) => rootRouter.use(x.path, x.element));
