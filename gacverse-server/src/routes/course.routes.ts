import express from "express";
import { addCourse, deleteCourse, getCourses, getFeaturedCourses, getSingleCourse, updateCourse } from "../controllers";

export const courseRoutes = express.Router();

courseRoutes.get("/pagination", getCourses);
courseRoutes.get("/featured", getFeaturedCourses);
courseRoutes.post("/add", addCourse);
courseRoutes.put("/update/:courseid", updateCourse);
courseRoutes.delete("/delete", deleteCourse);
courseRoutes.get("/:courseid", getSingleCourse);
