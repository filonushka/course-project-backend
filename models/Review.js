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
      min: 1,
      max: 10,
    },
    grades: [
      {
        name: {
          type: String,
          required: true,
        },
        grade: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],
    reviewImageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        name: {
          type: String,
          required: true,
        },
        createdAt: {
          type: String,
          // required: true,
        },
        commentContent: {
          type: String,
          required: true,
          minlength: 3,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
