import { Request, Response, NextFunction } from "express";
import { loginSchema, signUpSchema, emailSchema, verifyToken } from "../lib";
import { HEADERS_OPTIONS } from "../constants";

export const validateUserSignUp = (req: Request, _res: Response, next: NextFunction) => {
  try {
    signUpSchema.parse(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
}

export const validateUserLogin = (req: Request, _res: Response, next: NextFunction) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
}

export const validateEmail = (req: Request, _res: Response, next: NextFunction) => {
  try {
    emailSchema.parse(req.body);
    next();
  } catch (err: unknown) {
    next(err);
  }
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(HEADERS_OPTIONS.split)[1];

    if (!token)
      return res.status(401).json({ message: "No token provided" });
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (err: unknown) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
