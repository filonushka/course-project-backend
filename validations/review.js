import { body } from "express-validator";

export const reviewCreateValidation = [
  body("reviewTitle", "Enter review title").isLength({ min: 3 }).isString(),
  body("productTitle", "Choose product category").isString(),
  body("reviewExtract", "Enter review extract")
    .isLength({ min: 10 })
    .isString(),
  body("reviewContent", "Enter review content")
    .isLength({ min: 20 })
    .isString(),
  body("tags", "Invalid format").optional(),
  body("rating", "Invalid format").isString(),
  body("reviewImageUrl", "Invalid image link").optional().isString(),
];
