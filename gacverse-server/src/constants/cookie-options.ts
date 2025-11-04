import { CookieOptions } from "express";
import { SERVER_CONFIG } from "./server-config";

export const COOKIE_OPTION: CookieOptions = {
  httpOnly: true,
  secure: SERVER_CONFIG.node_env === "production",
  sameSite: SERVER_CONFIG.node_env === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}
