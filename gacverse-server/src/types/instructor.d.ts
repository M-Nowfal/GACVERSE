import mongoose from "mongoose";
import { Document } from "mongoose";

interface Instructor extends Document {
  experice: number;
  courses: mongoose.Types.ObjectId[];
  expertIn: string;
  bio: string;
}
