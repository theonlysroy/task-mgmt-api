import z from "zod";

export const envSchema = z.object({
  nodeEnv: z.enum(["development", "staging", "production"]).default("development"),
  port: z.coerce.number("PORT is required").default(4000),
  host: z.ipv4().default("0.0.0.0"),
  apiVersion: z.enum(["v1", "v2"]).default("v1"),
  mongo: z.object({
    host: z.ipv4("DB host is required"),
    port: z.coerce.number("DB port is required").default(27017),
    user: z.string("DB user is required"),
    password: z.string("DB password is required"),
    dbName: z.string("DB name is required").default("demo"),
  }),
  cookieSecret: z.string().min(1, "Cookie secret is required"),
  jwt: z.object({
    secret: z.string().min(1, "JWT secret is required"),
    accessTokenExpiry: z.string().default("1h"),
    refreshTokenExpiry: z.string().default("30d"),
  }),
  serverUrl: z.string().optional(),
  smtp: z.object({
    resendApiKey: z.string(),
  }),
});

export type Config = z.infer<typeof envSchema>;
export type ConfigKeys = keyof Omit<Config, "serverUrl">;

export const buildRawEnvData = (pEnv: NodeJS.ProcessEnv): Record<ConfigKeys, any> => {
  return {
    nodeEnv: String(pEnv.NODE_ENV),
    port: String(pEnv.PORT),
    host: String(pEnv.HOST),
    apiVersion: String(pEnv.API_VERSION),
    mongo: {
      host: String(pEnv.MONGO_HOST),
      port: String(pEnv.MONGO_PORT),
      user: String(pEnv.MONGO_USER),
      password: String(pEnv.MONGO_PASSWORD),
      dbName: String(pEnv.MONGO_DB_NAME),
    },
    cookieSecret: String(pEnv.COOKIE_SECRET),
    jwt: {
      secret: String(pEnv.JWT_SECRET),
      accessTokenExpiry: String(pEnv.JWT_ACCESS_TTL),
      refreshTokenExpiry: String(pEnv.JWT_REFRESH_TTL),
    },
    smtp: {
      resendApiKey: String(pEnv.RESEND_API_KEY),
    },
  };
};
