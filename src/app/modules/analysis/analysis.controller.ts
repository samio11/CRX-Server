import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./analysis.service";

const getAdminAnalysis = catchAsync(async (req, res, next) => {
  const result = await AdminService.getAdminAnalysis();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin Analysis Done",
    data: result,
  });
});

export const analysisController = { getAdminAnalysis };
