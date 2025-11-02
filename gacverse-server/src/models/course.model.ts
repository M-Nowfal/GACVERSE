import mongoose from "mongoose";
import { CourseDocument } from "../types";
import { Lesson } from "../types/course";

const lessonSchema = new mongoose.Schema<Lesson>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true,
    min: 1
  }
}, { timestamps: true });

const courseSchema = new mongoose.Schema<CourseDocument>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
    default: "Beginner"
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 4,
    min: 1,
    max: 5
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review"
  },
  noOfEnrollment: {
    type: Number,
    required: true
  },
  tags: {
    type: [String]
  },
  lessons: {
    type: [lessonSchema],
    default: []
  }
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
