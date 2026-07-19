import { config } from '@lib/config.js';
import { connectDb } from '@lib/db.js';

async function main() {
  try {
    await connectDb();
  } catch (error) {}
}

main();
