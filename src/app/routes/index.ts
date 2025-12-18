import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

export const rootRouter = Router();

const excludingModule = [
  {
    path: "/auth",
    element: authRoutes,
  },
];

excludingModule.forEach((x) => rootRouter.use(x.path, x.element));
