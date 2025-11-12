import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { CourseProgress } from "../types/student";
import mongoose from "mongoose";

export const updateStudentDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err: unknown) {
    next(err);
  }
}

export const enrollStudentInCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: studentid } = req.body;
    const courseid = req.params.courseid;

    const student = await User.findById(studentid);
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    if (student.role !== "student")
      return res.status(400).json({ message: "Only students can enroll in a course" });

    if (!student.details) student.details = {} as any;
    if (!student.details.student) student.details.student = {} as any;
    if (!student.details.student.enrolledCourses) student.details.student.enrolledCourses = [];

    const alreadyEnrolled = student.details.student.enrolledCourses.some((course: CourseProgress) =>
      course.course.toString() === courseid
    );

    if (alreadyEnrolled)
      return res.status(400).json({ message: "Student already enrolled in this course" });

    const newCourseProgress = {
      course: new mongoose.Types.ObjectId(courseid),
      progress: 0,
      completedLessons: [],
      enrolledAt: new Date()
    };

    const updatedStudent = await User.findByIdAndUpdate(
      studentid,
      { $push: { "details.student.enrolledCourses": newCourseProgress } },
      { new: true }
    )
      .populate("details.student.enrolledCourses.course")
      .select("-password");

    res.status(200).json({
      message: "Student enrolled in course successfully",
      updatedStudent
    });
  } catch (err: unknown) {
    next(err);
  }
};
