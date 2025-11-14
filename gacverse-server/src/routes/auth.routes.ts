import express from "express";
import {
  login, logout,
  signup, getCurrentAuth,
  sendOtp, verifyOtp
} from "../controllers";
import { auth, validateUserLogin, validateUserSignUp } from "../middlewares";
import { validateEmail, validateToken } from "../middlewares";
import { resetPassword } from "../controllers/auth.controller";

export const authRoutes = express.Router();

authRoutes.get("/me", auth, getCurrentAuth);

authRoutes.post("/login", validateUserLogin, login);
authRoutes.post("/signup", validateUserSignUp, signup);
authRoutes.post("/logout", auth, logout);

authRoutes.post("/send-otp", validateEmail, sendOtp);
authRoutes.post("/verify-otp", verifyOtp);

authRoutes.post("/forgetpassword", validateEmail, sendOtp);
authRoutes.post("/resetpassword", validateToken, resetPassword);
