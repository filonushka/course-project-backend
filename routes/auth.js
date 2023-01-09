import { Router } from "express";

import { UserController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { registerValidation, loginValidation } from "../validations/auth.js";

const router = new Router();

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

router.get("/me", checkAuth, UserController.getMe);

export default router;
