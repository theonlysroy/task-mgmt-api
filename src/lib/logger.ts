import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";

// setup logging dir
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// app logging stream
const appLogStream = fs.createWriteStream(path.join(logDir, "app.log"), {
  flags: "a",
});

// request logging stream
const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), {
  flags: "a",
});

const write = (level: string, message: string, ...meta: unknown[]) => {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] ${message}` + (meta.length ? ` ${JSON.stringify(meta)}` : "");
  console.log(line);
  appLogStream.write(line + "\n");
};

export const requestLogger = morgan("combined", {
  stream: accessLogStream,
});

export const logger = {
  info: (message: string, ...meta: unknown[]) => {
    write("INFO", message, ...meta);
  },
  warn: (message: string, ...meta: unknown[]) => {
    write("WARN", message, ...meta);
  },
  error: (message: string, ...meta: unknown[]) => {
    write("ERROR", message, ...meta);
  },
  debug: (message: string, ...meta: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      write("DEBUG", message, ...meta);
    }
  },
};
