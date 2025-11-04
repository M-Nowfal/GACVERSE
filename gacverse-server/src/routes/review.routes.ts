import express from "express";
import { getReviews, getFeaturedReviews } from "../controllers";

export const reviewRoutes = express.Router();

reviewRoutes.get("/", getReviews);
reviewRoutes.get("/featured", getFeaturedReviews);
