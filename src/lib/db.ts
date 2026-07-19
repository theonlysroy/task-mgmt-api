import { config } from './config.js';

const buildDbConnectionString = (
  dbDriver: 'mongo' | 'postgres' | 'mysql',
): string => {
  if (!dbDriver) {
    console.log('DB Driver is required.');
    return '';
  }
  switch (dbDriver) {
    case 'mongo':
      return `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
    case 'mysql':
      return 'test-mysql';
    case 'postgres':
      return 'test-postgres';
  }
};
export const connectDb = async () => {
  const connectionString = buildDbConnectionString();
  try {
  } catch (error) {}
};
