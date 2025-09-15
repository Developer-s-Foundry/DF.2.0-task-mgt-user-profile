import pkg from "pg";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { Pool } = pkg;
const databaseUrl = process.env.DB_URL;
const pool = new Pool({
  connectionString: databaseUrl,
});

if (process.env.NODE_ENV === "development") {
  let seedQuery = fs.readFileSync(__dirname + "/exercises.seed.sql", {
    encoding: "utf8",
  });
  pool.query(seedQuery, (err: Error, res: any) => {
    console.log(err, res);
    console.log("Seeding Completed!");
    pool.end();
  });
}
