import { Router } from "express";
import { authController } from "./auth.controller";

import validateRequest from "../../middlewares/validateRequest";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "./auth.validation";
import { parseFormData } from "../../middlewares/parseFormData";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  authController.userLogin
);
router.post(
  "/register",
  multerUpload.single("file"),
  parseFormData,
  validateRequest(registerValidationSchema),
  authController.userRegister
);
router.post("/logout", authController.userLogout);

export const authRoutes = router;
