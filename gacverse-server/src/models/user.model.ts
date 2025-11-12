import mongoose from "mongoose";
import { UserDocument } from "../types";

const courseProgressSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  progress: { type: Number, default: 0 },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  enrolledAt: { type: Date, default: Date.now }
});

const studentDetailsSchema = new mongoose.Schema({
  roll_no: String,
  year: String,
  degree: String,
  major: String,
  semester: Number,
  enrolledCourses: [courseProgressSchema]
});

const instructorDetailsSchema = new mongoose.Schema({
  experience: Number,
  expertIn: String,
  bio: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: false,
    trim: true
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
    default: "student"
  },
  avatar: {
    type: String,
    trim: true
  },
  details: {
    student: studentDetailsSchema,
    instructor: instructorDetailsSchema
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
