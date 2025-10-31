import mongoose from "mongoose";
import { UserDocument } from "../types";

const userSchema = new mongoose.Schema<UserDocument>({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  firstName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: false,
    trim: true
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
    default: "student"
  },
  avatar: {
    type: String,
    required: false,
    default: "@/assets/images/avatar.svg"
  },
  details: {
    type: Object,
    required: false,
    default: {}
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
