import mongoose from "mongoose";
import { LessonDocument } from "../types/course";

const lectureSchema = new mongoose.Schema({
  title: {
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
  },
  description: {
    type: String,
    trim: true
  }
});

const lessonSchema = new mongoose.Schema<LessonDocument>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  lectures: [lectureSchema],
  description: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
