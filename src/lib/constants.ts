export const AppConstants = {
  password: {
    minLength: 8,
    maxLength: 8,
    regex: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,18})\S$/,
  },
  jwt: {
    refreshExpiry: 30,
    regex: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
  },
} as const;
