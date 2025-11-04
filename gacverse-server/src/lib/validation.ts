import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string()
    .min(2, "FirstName must be at least 2 characters long")
    .max(20, "FirstName too long")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces"),
  lastName: z.string()
    .min(1, "LastName must be at least 1 characters long")
    .max(10, "LastName too long")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces"),
  email: z.email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  password: z.string().min(8, "Pasword must be at leat 8 characters")
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Pasword must be at leat 8 characters")
});
