import express from "express";
import {
  login, logout,
  signup, getCurrentAuth
} from "../controllers";
import { auth, validateUserLogin, validateUserSignUp } from "../middlewares";

export const authRoutes = express.Router();

authRoutes.get("/me", auth, getCurrentAuth);
authRoutes.post("/login", validateUserLogin, login);
authRoutes.post("/signup", validateUserSignUp, signup);
authRoutes.post("/logout", auth, logout);
