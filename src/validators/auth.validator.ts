import { z } from "zod";

export const signupSchema = z.object(
  {
    first_name: z
      .string({
        required_error: "First name is required.",
        invalid_type_error: "First name must be a string.",
      })
      .min(1, { message: "First name shouldn't be empty." }),
    last_name: z
      .string({
        required_error: "Last name is required.",
        invalid_type_error: "Last name must be a string.",
      })
      .min(1, { message: "Last name shouldn't be empty." }),
    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string.",
      })
      .min(1, { message: "Email shouldn't be empty." })
      .email({ message: "Email is invalid." }),
    password: z
      .string({
        required_error: "Password is required.",
        invalid_type_error: "Password must be a string.",
      })
      .min(8, { message: "Password should be atleast 8 characters long." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const signinSchema = z.object(
  {
    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string.",
      })
      .min(1, { message: "Email shouldn't be empty." })
      .email({ message: "Email is invalid." }),
    password: z
      .string({
        required_error: "Password is required.",
        invalid_type_error: "Password must be a string.",
      })
      .min(8, { message: "Password should be atleast 8 characters long." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);
