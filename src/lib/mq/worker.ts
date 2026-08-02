import { Worker } from "bullmq";
import { logger } from "@/lib/logger.js";
import { notificationQueueName, workerRedisConnection } from "@/lib/mq/config.js";

const worker = new Worker(
  notificationQueueName,
  async (job) => {
    logger.info(`Processing job ${job.id}`, job.data);

    // Put the actual notification work here.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Throw an error when the job should be retried.
  },
  { connection: workerRedisConnection },
);

worker.on("completed", (job) => {
  logger.info(`Job ${job.id} done`);
});

worker.on("failed", (job, error) => {
  logger.error(`Job ${job?.id ?? "unknown"} failed`, error.message);
});

worker.on("error", (error) => {
  logger.error("Notification worker error", error.message);
});

const shutdown = async (signal: string) => {
  logger.info(`${signal} received by notification worker`);
  await worker.close();
  process.exit(0);
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

logger.info(`Notification worker listening on queue ${notificationQueueName}`);
