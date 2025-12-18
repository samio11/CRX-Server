import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.services";

const getAllUser = catchAsync(async (req, res, next) => {
  const query = req?.query || "";
  const result = await userServices.getAllUser(query as Record<string, string>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All User Data",
    data: result,
  });
});
const getAUser = catchAsync(async (req, res, next) => {
  const { id } = req?.user as JwtPayload;
  const result = await userServices.getAUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get A User Data",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req?.user as JwtPayload;
  const payload = req?.body;
  const result = await userServices.updateUserData(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update A User Data",
    data: result,
  });
});
const blockUser = catchAsync(async (req, res, next) => {
  const { userId } = req?.params;
  const result = await userServices.blockUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Is Blocked",
    data: result,
  });
});
const unBlockUser = catchAsync(async (req, res, next) => {
  const { userId } = req?.params;
  const result = await userServices.unBlockUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Is Un-Blocked",
    data: result,
  });
});

export const userController = {
  getAllUser,
  getAUser,
  updateUser,
  blockUser,
  unBlockUser,
};
