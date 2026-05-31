const { Redis } = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // Required by BullMQ
};

const redisConnection = new Redis(redisConfig);

module.exports = { redisConnection, redisConfig };
