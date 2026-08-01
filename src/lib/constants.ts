export const AppConstants = {
  password: {
    minLength: 8,
    maxLength: 8,
    regex: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,18})\S$/,
  },
  jwt: {
    refreshExpiry: 1,
    regex: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
  },
  smtp: {
    regex: /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/,
    allowedPorts: [25, 587, 456, 2525],
  },
} as const;
