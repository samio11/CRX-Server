import { Router } from "express";
import { checkAuth } from "../../config/checkAuth";
import { ERole } from "../user/user.interface";
import { parseFormData } from "../../middlewares/parseFormData";
import { multerUpload } from "../../config/multer.config";
import { carController } from "./car.controller";

const router = Router();

router.post(
  "/",
  checkAuth([ERole.admin]),
  multerUpload.single("file"),
  parseFormData,
  carController.createCar
);

router.get("/", carController.getAllCars);
router.get("/:carId", carController.getCarById);
router.patch("/:carId", checkAuth([ERole.admin]), carController.updateCar);
router.patch(
  "/update-available/:carId",
  checkAuth([ERole.admin]),
  carController.updateCarAvailability
);
router.delete("/:carId", checkAuth([ERole.admin]), carController.deleteCar);

export const carRoutes = router;
