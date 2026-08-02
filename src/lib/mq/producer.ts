import { Queue } from "bullmq";
import { notificationQueueName, redisConnection } from "@/lib/mq/config.js";

const notifyQueue = new Queue(notificationQueueName, {
  connection: redisConnection,
});

export const addNotificationJobs = async (data: Record<string, unknown>) => {
  await notifyQueue.add("health-check", data);
};
