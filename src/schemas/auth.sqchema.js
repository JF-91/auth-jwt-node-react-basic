import { z } from "zod";

//TODO:VALIDACIONES REGITER

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is requried",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is requried",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});


//TODO:VALIDACIONES LOGIN

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is requried",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at lest 6 characters",
    }),
});
