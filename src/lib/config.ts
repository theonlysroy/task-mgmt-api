import dotenv from "dotenv";
import { treeifyError, ZodError } from "zod";
import { ApiError } from "@lib/ApiError.js";
import { ErrorMsg } from "@/lib/messages.js";
import { buildRawEnvData, envSchema, type Config } from "@/lib/env.js";
import { logger } from "@/lib/logger.js";

const envPath = process.env.NODE_ENV === "development" ? ".env.local" : ".env.prod";
dotenv.config({ path: envPath, quiet: true });

const makeConfig = async (): Promise<Config> => {
  try {
    const envVars = buildRawEnvData(process.env);
    logger.info("envVars =>", { envVars });
    const result = await envSchema.safeParseAsync(envVars);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  } catch (error: any) {
    logger.error(ErrorMsg.configValidationFailed, error.stack);
    process.exit(1);
  }
};

const config = await makeConfig();
logger.info("Config =>", config);
export { config };
