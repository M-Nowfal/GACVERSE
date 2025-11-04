import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : req.cookies?.token;

    if (!token) 
      return res.status(401).json({ message: "Authentication required" });

    const payload = verifyToken(token);
    if (!payload) 
      return res.status(401).json({ message: "Invalid or expired token" });

    req.user = payload;
    next();
  } catch (err: unknown) {
    next(err);
  }
}
