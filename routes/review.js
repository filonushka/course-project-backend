import { Router } from "express";
import { ReviewController } from "../controllers/index.js";
import { reviewCreateValidation } from "../validations/review.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";

const router = new Router();

router.get("/get-all-reviews", ReviewController.getAll);
router.get("/get-full-review/:id", ReviewController.getOne);
router.post(
  "/create-review",
  checkAuth,
  reviewCreateValidation,
  handleValidationErrors,
  ReviewController.create
);
router.delete("/delete-review/:id", checkAuth, ReviewController.remove);
router.patch(
  "/update-review/:id",
  checkAuth,
  handleValidationErrors,
  ReviewController.update
);

export default router;
