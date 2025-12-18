import { QueryBuilder } from "../../utils/QueryBuilder";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUser = async (query: Record<string, string>) => {
  const userQuery = new QueryBuilder(User.find(), query);
  const userData = userQuery
    .filter()
    .search(["name", "email"])
    .sort()
    .paginate()
    .fields();
  const [data, meta] = await Promise.all([
    await userData.build(),
    await userData.getMeta(),
  ]);
  return { data, meta };
};

const getAUser = async (userId: string) => {
  const existUser = await User.findById(userId);
  return existUser;
};

const updateUserData = async (userId: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
};

const blockUser = async (userId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { isVerified: false },
    { new: true }
  );
  return result;
};
const unBlockUser = async (userId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { isVerified: true },
    { new: true }
  );
  return result;
};

export const userServices = {
  getAllUser,
  getAUser,
  updateUserData,
  blockUser,
  unBlockUser,
};
