import { z } from "zod";
import { user_role } from "./user.constants";

const createUserValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z
    .nativeEnum(user_role)
    .refine((val) => val === "user" || val === "admin", {
      message: "Role must be 'user' or 'admin'",
    })
    .default(user_role.admin),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string().min(6, { message: "Phone must be at least 6 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  isDeleted: z.boolean().optional(),
});
const signInUserValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const userValidation = {
  createUserValidationSchema,
  signInUserValidationSchema,
};
