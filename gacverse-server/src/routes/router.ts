import express from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { courseRoutes } from "./course.routes";
import { reviewRoutes } from "./review.routes";

export const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/course", courseRoutes);
router.use("/review", reviewRoutes);

router.get("/health", (_req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Server is running" });
});
