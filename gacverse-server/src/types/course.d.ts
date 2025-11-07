import mongoose, { Document } from "mongoose";
import { Review } from "./review";

interface Lesson extends Document {
  title: string;
  lectures: [
    {
      title: string;
      videoUrl: string;
      duration: string;
      order: number;
      description: string;
    }
  ];
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
  lessons: Lesson[];
  whatsInTheCourse: string[];
  createdAt: Date;
  updatedAt: Date;
}
