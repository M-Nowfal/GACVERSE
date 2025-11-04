import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { compare, generateToken, hash } from "../lib";
import { COOKIE_OPTION } from "../constants/cookie-options";

export const getCurrentAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });
    const user = await User.findById(req.user.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err: unknown) {
    next(err);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Incorrect password or email" });
    
    const token = generateToken(user._id.toString(), user.email);
    
    res.cookie("token", token, COOKIE_OPTION);
    res.status(200).json({ 
      message: `Welcome back ${user.name}`, 
      user: { ...user, password: null } 
    });
  } catch (err: unknown) {
    next(err);
  }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const name = firstName + " " + lastName;
    
    const alreadyExist = await User.findOne({ email, phone });
    
    if (alreadyExist)
      return res.status(400).json({ message: "Email or phone already exist, try to login or use a diffrent email" });
    
    const newUser = await User.create({
      name, firstName, lastName,
      email, phone,
      password: await hash(password)
    });

    const token = generateToken(newUser._id.toString(), newUser.email);

    res.cookie("token", token, COOKIE_OPTION);
    res.status(201).json({ 
      message: "Registration Success", 
      user: { ...newUser, password: null } 
    });
  } catch (err: unknown) {
    next(err);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", COOKIE_OPTION);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err: unknown) {
    next(err);
  }
}
