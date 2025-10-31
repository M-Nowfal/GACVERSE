import mongoose from "mongoose";
import mongooseSanitize from "mongoose-sanitize";
import logger from "./logger";
import { DB_CONFIG } from "../constants";

mongoose.plugin(mongooseSanitize);

export const connectDB = async (): Promise<void> => {
  const { conn_uri, db_name } = DB_CONFIG;
  await mongoose.connect(conn_uri, { dbName: db_name });
  logger.info("DataBase connected successfully!");
}
