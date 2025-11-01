import mongoose, { Document } from "mongoose";
import { Student } from "./student";
import { Instructor } from "./instructor";

interface UserDocument extends Document {
  name: string;
  firstName: string;
  lastName: string;
  role: "student" | "instructor" | "admin";
  avatar: string;
  email: string;
  phone: string;
  password: string;
  details: Student | Instructor;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
