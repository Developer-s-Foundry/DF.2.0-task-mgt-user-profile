import { DataSource } from "typeorm";
import APP_CONFIGS from "./index";
import { User } from "../../models/userModel";
import { Team } from "../../models/teamModel";
import { TeamMemberShip } from "../../models/teamMembershipModel";
import { Role } from "../../models/roleModel";
import { Task } from "../../models/taskModel";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_USERNAME,
} = APP_CONFIGS;

// database configuration
const databaseConfig = new DataSource({
  type: "postgres",
  host: `${DATABASE_HOST}`,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: true,
  // entities: ["src/models/**/*{.ts,.js}"],
  entities: [User, Team, TeamMemberShip, Role, Task],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});

export default databaseConfig;
