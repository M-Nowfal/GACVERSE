import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { createClient, RedisClientType } from "redis";
import { REDIS_CONFIG } from "../constants";
import logger from "../utils/logger";
import RedisStore from "rate-limit-redis";

const redisClient: RedisClientType = createClient({
  url: REDIS_CONFIG.redis_url
});

redisClient.connect()
  .then(() => logger.info("Redis connected!"))
  .catch((err) => logger.error("Redis connection failed: ", err));

export const limiter: RateLimitRequestHandler = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args)
  }),
  windowMs: 15 * 1000,
  max: 10,
  message: { message: "Too many request, please try again after sometime." }
});
