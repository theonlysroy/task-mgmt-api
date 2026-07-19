import { ErrorMsg } from "@/lib/messages.js";
import cors from "cors";

const allowedOrigins = ["http://localhost:5173"];
const allowedMethods = ["GET", "POST", "OPTIONS"];
const allowedHeaders = ["Content-Type", "Authorization"];

export const corsPolicies = cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.indexOf(origin) !== 1) {
      cb(null, true);
    } else {
      cb(new Error(ErrorMsg.cors));
    }
  },
  methods: allowedMethods,
  allowedHeaders,
  credentials: true,
  optionsSuccessStatus: 200,
});
