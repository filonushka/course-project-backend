import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
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
const PORT = process.env.PORT || 4444;
app.use(express.json());
app.use(cors());

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is running, PORT ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json("Server is working, yeahhhhhhhh!)");
});
