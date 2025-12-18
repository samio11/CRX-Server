import { Router } from "express";

import { ERole } from "./user.interface";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { checkAuth } from "../../config/checkAuth";

const router = Router();

router.get("/", checkAuth([ERole.admin]), userController.getAllUser);
router.get(
  "/get-single",
  checkAuth([...Object.values(ERole)]),
  userController.getAUser
);
router.put(
  "/update",
  checkAuth([...Object.values(ERole)]),
  userController.updateUser
);

router.post(
  "/block/:userId",
  checkAuth([ERole.admin]),
  userController.blockUser
);
router.post(
  "/un-block/:userId",
  checkAuth([ERole.admin]),
  userController.unBlockUser
);

export const userRoutes = router;
