import { requestLogger } from "@/lib/logger";
import express from "express";

const app = express();

// json middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(requestLogger);

export default app;
