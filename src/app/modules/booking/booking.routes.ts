import express from "express";
import { checkAuth } from "../../config/checkAuth";
import { ERole } from "../user/user.interface";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post("/", checkAuth([ERole.user]), BookingController.createBooking);
router.get("/", checkAuth([ERole.admin]), BookingController.getAllBooking);

router.get(
  "/user",
  checkAuth([ERole.user]),
  BookingController.getBookingByUser
);
router.get(
  "/:bookingId",
  checkAuth([...Object.values(ERole)]),
  BookingController.getABooking
);
router.delete("/:id", checkAuth([ERole.user]), BookingController.cancelBooking);
router.post(
  "/complete/:id",
  checkAuth([ERole.user]),
  BookingController.completeBooking
);

export const BookingRoutes = router;
