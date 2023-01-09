import express from "express";
import multer from "multer";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { checkAuth } from "./utils/index.js";

import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/review.js";

dotenv.config();

const PORT = process.env.PORT || 4444;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.zubpkej.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
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

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/reviews", reviewRoute);

app.use("/api/uploads", express.static("uploads"));
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is running, PORT ${PORT}`);
});
