import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    reviewTitle: {
      type: String,
      required: true,
    },
    reviewExtract: {
      type: String,
      required: true,
    },
    reviewContent: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewImageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
