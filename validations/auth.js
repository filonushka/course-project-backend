import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must contain at least 5 characters").isLength({
    min: 5,
  }),
  body("name", "Enter your name").isLength({ min: 3 }),
];

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must contain at least 5 characters").isLength({
    min: 5,
  }),
];
