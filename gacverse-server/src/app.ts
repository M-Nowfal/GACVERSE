import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { CORS_OPTIONS, SERVER_CONFIG } from "./constants";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./utils/logger";
import { router } from "./routes/router";

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(`/api/${SERVER_CONFIG.version}`, router);

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  const error = err instanceof Error ? err.stack : String(err);
  logger.error(error);
  res.status(500).json({ message: `Internal Server Error!\n${error}` });
});

export default app;
