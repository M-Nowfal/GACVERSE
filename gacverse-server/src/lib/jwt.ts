import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../constants";

interface JWTPayload {
  userId: string;
  email: string;
}

export const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email }, 
    JWT_CONFIG.jwt_secret, 
    { expiresIn: JWT_CONFIG.jwt_expires_in }
  );
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_CONFIG.jwt_secret) as JWTPayload;
  } catch {
    return null;
  }
}
