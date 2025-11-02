import express from "express";
import { getFeaturedReviews } from "../controllers";

export const reviewRoutes = express.Router();

reviewRoutes.get("/featured", getFeaturedReviews);
