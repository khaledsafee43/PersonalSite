import { refine, z } from "zod";
export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must contain at least 3 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  confirmPassword: z.string(),
});

refine((data)=> data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
})
