import { AppError } from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";

const userLogin = async (payload: { email: string; password: string }) => {
  const existUser = await User.findOne({ email: payload.email });
  if (!existUser) throw new AppError(401, "User is not found");
  if (existUser.isVerified === false)
    throw new AppError(401, "Please wait for admin approval");
  const passwordMatch = await bcrypt.compare(
    payload.password,
    existUser.password
  );
  if (!passwordMatch) throw new AppError(401, "Password is not Matched");
  console.log(existUser);
  return existUser;
};

const userRegister = async (payload: IUser) => {
  const existUser = await User.findOne({ email: payload.email });
  if (existUser) throw new AppError(401, "User Is Already Exists");
  const result = await User.create(payload);
  await sendEmail({
    to: result.email,
    subject: "Welcome to CRX 🚕",
    tempName: "welcome",
    tempData: {
      name: result.name,
      email: result.email,
      role: result.role,
      year: new Date().getFullYear(),
    },
  });
  return result;
};

export const authServices = { userLogin, userRegister };
