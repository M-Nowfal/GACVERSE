import { NextFunction, Request, Response } from "express";
import { Course } from "../models";
import { DB_CONFIG } from "../constants";

export const getFeaturedCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name avatar details")
      .sort({ noOfEnrollment: -1 })
      .limit(5);

    res.status(200).json({ courses });
  } catch (err: unknown) {
    next(err);
  }
}

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page || 1);
    const totalCourses = await Course.countDocuments();
    const hasMore = page * DB_CONFIG.page_limit < totalCourses;
    const courses = await Course.find()
      .populate("instructor", "name avatar details")
      .sort({ noOfEnrollment: -1 })
      .skip((page - 1) * DB_CONFIG.page_limit)
      .limit(DB_CONFIG.page_limit);

    res.status(200).json({
      courses,
      hasMore,
      nextPage: hasMore ? page + 1 : page
    });
  } catch (err: unknown) {
    next(err);
  }
}

export const getSingleCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const addCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}
