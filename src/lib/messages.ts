export const ErrorMsg = {
  globalRateLimit: "Too many requests from this IP. Try again later.",
  authRateLimit: "Too many login attempts",
  cors: "Blocked by CORS policy: Unauthorized origin.",
  routeNotFound: "Requested url not found on API v1",
} as const;

export const SuccessMsg = {
  apiV1Health: "API v1 is running...",
} as const;
