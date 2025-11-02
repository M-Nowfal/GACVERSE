import mongoose, { Document } from "mongoose";

interface ReviewDocument extends Document {
  name: string;
  avatar: string;
  review: string;
  rating: number;
  course: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
