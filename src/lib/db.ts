import mongoose from "mongoose";
import { config } from "./config.js";
import { logger } from "./logger.js";

const buildDbConnectionString = (
  dbDriver: "mongo" | "postgres" | "mysql",
): string => {
  if (!dbDriver) {
    console.log("DB Driver is required.");
    return "";
  }
  switch (dbDriver) {
    case "mongo":
      return `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}?authSource=admin`;
    case "mysql":
      return "test-mysql";
    case "postgres":
      return "test-postgres";
  }
};

export const connectDb = async () => {
  const connectionString = buildDbConnectionString("mongo");
  try {
    const conn = await mongoose.connect(connectionString, {
      connectTimeoutMS: 2000,
    });
    logger.info("Database connected. DB:", conn.connection.db?.databaseName);
  } catch (error: any) {
    logger.error("Database connection failed.", error.message);
    throw error;
  }
};
