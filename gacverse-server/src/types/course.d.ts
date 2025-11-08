import mongoose, { Document } from "mongoose";
import { Review } from "./review";

interface Lecture {
  title: string;
  videoUrl: string;
  duration: string;
  order: number;
  description: string;
}

interface LessonDocument extends Document {
  title: string;
  lectures: [Lecture];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CourseDocument extends Document {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
  noOfEnrollment: number;
  tags: string[];
  lessons: mongoose.Types.ObjectId[];
  whatsInTheCourse: string[];
  createdAt: Date;
  updatedAt: Date;
}
