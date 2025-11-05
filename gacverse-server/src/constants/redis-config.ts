interface redisConfig {
  redis_url: string;
}

export const REDIS_CONFIG: redisConfig = {
  redis_url: process.env.UPSTASH_REDIS_URL!
};
