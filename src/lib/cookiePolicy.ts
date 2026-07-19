import { config } from "@/lib/config.js";
import cookieParser from "cookie-parser";

export const cookiePolicies = cookieParser(config.cookieSecret, {});
