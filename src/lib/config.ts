import dotenv from "dotenv";
// [TODO] dynamic env path based on dev environment
dotenv.config({ path: ".env.local", quiet: true });

// [TODO] add zod schema validation
const envVars = process.env;
export const config = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
    user: envVars.MONGO_USER,
    password: envVars.MONGO_PASSWORD,
    dbName: envVars.MONGO_DB_NAME,
  },
};
