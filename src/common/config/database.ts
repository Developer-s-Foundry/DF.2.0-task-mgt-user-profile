import { DataSource } from "typeorm";
import { APP_CONFIGS } from ".";

const {
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_USERNAME,
} = APP_CONFIGS;

// Updated database configuration
export const databaseConfig = new DataSource({
  type: "mysql",
  host: `${DATABASE_HOST}`,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: true,
  entities: ["src/models/**/*{.ts,.js}"],
  migrations: ["src/database/migrations/**/*{.ts,.js}"],
});