import express from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { courseRoutes } from "./course.routes";

export const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/course", courseRoutes);
