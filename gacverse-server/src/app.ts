import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { CORS_OPTIONS, SERVER_CONFIG } from "./constants";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./utils/logger";
import { router } from "./routes/router";
import { ZodError } from "zod";
import { limiter } from "./middlewares";

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(`/api/${SERVER_CONFIG.version}`, limiter, router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `${req.path} Route not found!` });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  let errMessage = "Internal Server Error";

  if (err instanceof ZodError) {
    errMessage = err.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
  } else if (err instanceof Error) {
    errMessage = err.message;
  } else if (typeof err === "string") {
    errMessage = err;
  }
  logger.error(err);
  res.status(500).json({ message: errMessage });
});

export default app;
