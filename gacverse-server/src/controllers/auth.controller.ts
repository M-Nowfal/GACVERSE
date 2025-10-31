import { NextFunction, Request, Response } from "express";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello")
  } catch (err: unknown) {
    next(err);
  }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (err: unknown) {
    next(err);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (err: unknown) {
    next(err);
  }
}
