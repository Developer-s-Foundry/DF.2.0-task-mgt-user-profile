import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { APP_CONFIGS } from '../common/config';

const {
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_USERNAME,
} = APP_CONFIGS;

const databaseUrl = `postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const pool = new Pool({
  connectionString: databaseUrl,
});

// Use process.cwd() instead of __dirname since ts-node handles CJS differently
const rootDir = process.cwd();

if (process.env.NODE_ENV === 'development') {
  const seedFilePath = path.join(rootDir, 'src/seeders/data.sql');
  const seedQuery = fs.readFileSync(seedFilePath, { encoding: 'utf8' });

  pool.query(seedQuery, (err, res) => {
    if (err) {
      console.error('Error seeding database:', err);
    } else {
      console.log('Seeding Completed!');
    }
    pool.end();
  });
}
