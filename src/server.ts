import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import databaseConfig from "./common/config/database.ts";
import APP_CONFIGS from "./common/config/index.ts";

const app: express.Application = express();

databaseConfig
  .initialize()
  .then(() => {
    console.log("Connected to DB");

    app.listen(APP_CONFIGS.SERVER_PORT, () => {
      console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });
