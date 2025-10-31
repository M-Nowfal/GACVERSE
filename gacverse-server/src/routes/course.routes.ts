import express from "express";
import { addCourse, deleteCourse, getAllCourses, getFeaturedCourses, getSingleCourse, updateCourse } from "../controllers";

export const courseRoutes = express.Router();

courseRoutes.get("/featured", getFeaturedCourses);
courseRoutes.get("/all", getAllCourses);
courseRoutes.get("/:courseid", getSingleCourse);
courseRoutes.post("/add", addCourse);
courseRoutes.put("/update/:courseid", updateCourse);
courseRoutes.delete("/delete", deleteCourse);
