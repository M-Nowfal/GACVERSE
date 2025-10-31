import winston from "winston";
import { SERVER_CONFIG } from "../constants";

const isDev = SERVER_CONFIG.node_env !== "production";
let logFormat;

if (isDev) {
  logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
  );
} else {
  logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  );
}

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [new winston.transports.Console()],
});

export default logger;
