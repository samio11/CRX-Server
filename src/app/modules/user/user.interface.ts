export enum ERole {
  user = "user",
  admin = "admin",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: ERole;
  isVerified: boolean;
  profileImage?: string;
}
