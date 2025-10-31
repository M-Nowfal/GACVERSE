import mongoose, { Document } from "mongoose";

interface CourseProgress {
  course: mongoose.Types.ObjectId;
  progress: number;
  completedLessons: mongoose.Types.ObjectId[];
  enrolledAt: Date;
}

interface Student extends Document {
  roll_no: string;
  year: string;
  degree: string;
  major: string;
  semester: number;
  enrolledCourses: CourseProgress[];
}
