const { z } = require("zod");

// Creating an object scheme

const signupschema = z.object({
  username: z
    .string({ required_error: "UserName is required" })
    .trim()
    .min(3, { message: "UserName must be at least 3 characters" })
    .max(255, { message: "UserName must not be more then 255 characters" }),

  email: z
    .string({ required_error: "Email is required*" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more then 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be of 10 digits" })
    .max(10, { message: "Phone must be of 10 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be of at least 6 characters" })
    .max(1024, { message: "Password Not be greater then 1024 characters" }),
});



const loginschema = z.object({

  email: z
  .string({ required_error: "Email is required*" })
  .trim()
  .email({ message: "Invalid Email address" })
  .min(3, { message: "Email must be at least 3 characters" })
  .max(255, { message: "Email must not be more then 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be of at least 6 characters" })
    .max(1024, { message: "Password Not be greater then 1024 characters" }),
});


module.exports = {signupschema , loginschema};
