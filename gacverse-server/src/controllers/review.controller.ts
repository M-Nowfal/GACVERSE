import { NextFunction, Request, Response } from "express";
import { Review } from "../models";

export const getFeaturedReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await Review.find()
      .sort({ rating: -1, createdAt: -1 })
      .limit(5);
    res.status(200).json({ reviews });
  } catch (err: unknown) {
    next(err);
  }
}

export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const addReview = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}
