import express from "express";
import multer from "multer";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { registerValidation, loginValidation } from "./validations/auth.js";
import { reviewCreateValidation } from "./validations/review.js";
import { UserController, ReviewController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.zubpkej.mongodb.net/web-portal-for-reviews?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const PORT = process.env.PORT || 4444;
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/reviews", ReviewController.getAll);
app.get("/reviews/:id", ReviewController.getOne);
app.post(
  "/reviews",
  checkAuth,
  reviewCreateValidation,
  handleValidationErrors,
  ReviewController.create
);
app.delete("/reviews/:id", checkAuth, ReviewController.remove);
app.patch(
  "/reviews/:id",
  checkAuth,
  handleValidationErrors,
  ReviewController.update
);

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is running, PORT ${PORT}`);
});
