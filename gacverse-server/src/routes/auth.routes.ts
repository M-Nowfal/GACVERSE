import express from "express";
import {
  login, logout,
  signup, getCurrentAuth
} from "../controllers";

export const authRoutes = express.Router();

authRoutes.get("/me", getCurrentAuth);
authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/logout", logout);
