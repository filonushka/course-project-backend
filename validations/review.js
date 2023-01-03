import { body } from "express-validator";

export const reviewCreateValidation = [
  body("title", "Enter review title").isLength({ min: 3 }).isString(),
  body("product", "Choose product category").isString(),
  body("text", "Enter review text").isLength({ min: 10 }).isString(),
  body("tags", "Invalid format").optional().isString(),
  body("rating", "Invalid format").isString(),
  body("imageUrl", "Invalid image link").optional().isString(),
];
