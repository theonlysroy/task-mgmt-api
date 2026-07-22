import express from "express";
import helmet from "helmet";
import { requestLogger } from "@/lib/logger.js";
import { globalRateLimiter } from "@/lib/rateLimit.js";
import { corsPolicies } from "@/lib/corsConfig.js";
import { cookiePolicies } from "@/lib/cookiePolicy.js";
import v1ApiRouter from "@/api/v1/router.js";

const app = express();

// Security headers
app.use(helmet());

// logging traffic
app.use(requestLogger);

// Rate limiting
app.use(globalRateLimiter);

// cors
app.use(corsPolicies);

// cookie parser
app.use(cookiePolicies);

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api/v1", v1ApiRouter);

export default app;
