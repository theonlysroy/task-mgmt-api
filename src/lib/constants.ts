export const AppConstants = {
  password: {
    minLength: 8,
    maxLength: 8,
  },
  jwt: {
    refreshExpiry: 30,
  },
} as const;
