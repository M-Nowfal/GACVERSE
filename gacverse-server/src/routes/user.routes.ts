import express from "express";
import { enrollStudentInCourse } from "../controllers";

export const userRoutes = express.Router();

userRoutes.post("/student/enroll/:courseid", enrollStudentInCourse);
