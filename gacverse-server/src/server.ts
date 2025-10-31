import dotenv from "dotenv";
dotenv.config({ quiet: true });

import app from "./app";
import { connectDB } from "./utils/database";
import logger from "./utils/logger";
import { SERVER_CONFIG } from "./constants";

const { port, server_url } = SERVER_CONFIG;

connectDB()
  .then(() => app.listen(port, () => {
    logger.info(`Server is running at ${server_url}`);
  }))
  .catch((err: unknown) => {
    logger.error(err);
    process.exit(1);
  });
