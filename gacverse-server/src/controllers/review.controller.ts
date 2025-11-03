import { NextFunction, Request, Response } from "express";
import { Review } from "../models";
import { DB_CONFIG } from "../constants";

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

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page || 1);
    const totalReviews = await Review.countDocuments();
    const hasMore = page * DB_CONFIG.page_limit < totalReviews;
    const reviews = await Review.find()
      .sort({ rating: -1, createdAt: -1 })
      .skip((page - 1) * DB_CONFIG.page_limit)
      .limit(DB_CONFIG.page_limit);

    res.status(200).json({
      reviews,
      hasMore,
      nextPage: hasMore ? page + 1 : page
    });
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
