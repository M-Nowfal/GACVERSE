import { NextFunction, Request, Response } from "express";
import { Course } from "../models";

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

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {

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
