import mongoose from "mongoose";
import { Document } from "mongoose";

interface Instructor extends Document {
  experience: number;
  courses: mongoose.Types.ObjectId[];
  expertIn: string;
  bio: string;
}
