import type { RedisOptions } from "ioredis";

export const notificationQueueName = "notification";

export const redisConnection: RedisOptions = {
  host: "127.0.0.1",
  port: 6311,
};

export const workerRedisConnection: RedisOptions = {
  ...redisConnection,
  // BullMQ workers must be able to retry blocking Redis commands.
  maxRetriesPerRequest: null,
};
