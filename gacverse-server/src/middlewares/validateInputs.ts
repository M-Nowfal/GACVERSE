import { Request, Response, NextFunction } from "express";
import { loginSchema, signUpSchema } from "../lib";

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
