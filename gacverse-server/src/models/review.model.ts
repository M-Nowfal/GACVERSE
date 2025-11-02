import mongoose from "mongoose";
import { ReviewDocument } from "../types";

const reviewSchema = new mongoose.Schema<ReviewDocument>({
  name: {
    type: String,
    trim: true,
    required: true
  },
  avatar: {
    type: String,
    trim: true,
    required: true,
    default: "@/assets/images/avatar.svg"
  },
  review: {
    type: String,
    trim: true,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
