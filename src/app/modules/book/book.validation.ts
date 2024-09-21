import { z } from "zod";

const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

const createBookValidationSchema = z.object({
  userId: z.string().min(1, "User ID is required").optional(),
  carId: z.string().min(1, "Car ID is required"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  startTime: z
    .string({
      required_error: "Start time is required",
      invalid_type_error: "Start time must be a string",
    })
    .regex(timeRegex, "Start time must be in the format HH:MM"),
  endTime: z
    .union([
      z.string().regex(timeRegex, "End time must be in the format HH:MM"),
      z.null(),
    ])
    .optional(),
  totalCost: z.number().nonnegative().default(0),
});

export const bookValidation = {
  createBookValidationSchema,
};
