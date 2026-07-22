import app from "@/app.js";
import { config } from "@/lib/config.js";
import { connectDb } from "@lib/db.js";
import { logger } from "@lib/logger.js";
import mongoose from "mongoose";

async function main() {
  try {
    // await connectDb();
    app.listen(config.port, config.host, () => {
      logger.info(
        `Application running on http://${config.host}:${config.port}`,
      );
    });
  } catch (error) {
    logger.error("APP STARTUP FAILED.\n", JSON.stringify(error));
    process.exit(1);
  }
}

main();

// Register trap signals for gracefull shutdown
const handleGracefulShutdown = async () => {
  await mongoose.connection.close();
  process.exit(1);
};
process.on("SIGINT", async () => {
  logger.info("SIGINT received");
  await handleGracefulShutdown();
});
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received");
  await handleGracefulShutdown();
});

// Uncaught exception & unhandled rejections
process.on("uncaughtException", async (error) => {
  logger.error("Uncaught Exception", error);
  await handleGracefulShutdown();
});
process.on("unhandledRejection", async (reason) => {
  logger.error("Unhandled Rejection", reason);
  await handleGracefulShutdown();
});
