import { z } from "zod";
import { ERole } from "../user/user.interface";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(6, "Must Give Phone Number"),
    address: z.string(),
    role: z.nativeEnum(ERole),
    isVerified: z.boolean().default(true),
  }),
});
