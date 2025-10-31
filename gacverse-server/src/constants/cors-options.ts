import { CorsOptions } from "cors";

const CORS_OPTIONS: CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(","),
  credentials: true,
  methods: process.env.ALLOWED_METHODS?.split(","),
  allowedHeaders: process.env.ALLOWED_HEADERS?.split(","),
  optionsSuccessStatus: 204,
  maxAge: 86400
};

export { CORS_OPTIONS };
