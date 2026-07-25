export const ErrorMsg = {
  globalRateLimit: "Too many requests from this IP. Try again later.",
  authRateLimit: "Too many login attempts",
  cors: "Blocked by CORS policy: Unauthorized origin.",
  routeNotFound: "Requested url not found on API v1",
  validationFailed: "Validation Failed. Request object dont match intended structure",
  validationFailedFor: (part: string) => `Validation Failed for ${part}`,
} as const;

export const SuccessMsg = {
  apiV1Health: "API v1 is running...",
} as const;

export const ValidationMsg = {
  email: {
    required: "Email is a required field.",
  },
  password: {
    required: "Password is a required field.",
    minLength: "Password must be at least 8 characters",
  },
} as const;
