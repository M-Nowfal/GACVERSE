import { NextFunction, Request, Response } from "express";
import { Course, Lesson } from "../models";
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
    const search = req.query.search as string | undefined;
    let hasMore: boolean;
    let searchQuery: Record<string, any> = {};

    if (search === "all") {
      const courses = await Course.find()
        .populate("instructor", "name avatar details")
        .sort({ noOfEnrollment: -1 })
        .limit(DB_CONFIG.page_limit);
      hasMore = await Course.countDocuments() > DB_CONFIG.page_limit;
      return res.status(200).json({
        courses,
        hasMore,
        nextPage: hasMore ? 2 : 1
      });
    }

    if (search) {
      const regex = new RegExp(search, "i");
      searchQuery = {
        $or: [
          { title: { $regex: regex } },
          { tags: { $regex: regex } },
          { whatsInTheCourse: { $regex: regex } },
          { description: { $regex: regex } }
        ]
      };
    }

    const totalCourses: number = await Course.countDocuments(searchQuery);
    hasMore = page * DB_CONFIG.page_limit < totalCourses;

    const courses = await Course.find(searchQuery)
      .populate("instructor", "name avatar details")
      .sort({ noOfEnrollment: -1 })
      .skip(totalCourses <= DB_CONFIG.page_limit ? 0 : (page - 1) * DB_CONFIG.page_limit)
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
    const { courseid } = req.params;
    const course = await Course.findById(courseid).populate([
      {
        path: "instructor",
        select: "name avatar details"
      },
      {
        path: "lessons",
        select: "title description lectures",
        populate: { path: "lectures" }
      }
    ]);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ course });
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
