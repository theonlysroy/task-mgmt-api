import express from "express";
import helmet from "helmet";
import { requestLogger } from "@/lib/logger.js";
import { globalRateLimiter } from "@/lib/rateLimit.js";
import { corsPolicies } from "@/lib/corsConfig.js";

const app = express();

// Security headers
app.use(helmet());

// logging traffic
app.use(requestLogger);

// Rate limiting
app.use(globalRateLimiter);

// json middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(corsPolicies);

export default app;
