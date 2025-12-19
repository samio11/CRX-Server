import express from "express";
import { analysisController } from "./analysis.controller";
import { checkAuth } from "../../config/checkAuth";
import { ERole } from "../user/user.interface";

const router = express.Router();

router.get("/", checkAuth([ERole.admin]), analysisController.getAdminAnalysis);

export const AdminRoutes = router;
