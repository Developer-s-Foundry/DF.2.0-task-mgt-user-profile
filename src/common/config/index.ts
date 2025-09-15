import dotenv from "dotenv";
dotenv.config();

// declaring all environment variables
enum ENVIRONMENT_VARIABLES {
  DATABASE_HOST = "DATABASE_HOST",
  DATABASE_NAME = "DATABASE_NAME",
  DATABASE_USERNAME = "DATABASE_USERNAME",
  DATABASE_PORT = "DATABASE_PORT",
  SERVER_PORT = "SERVER_PORT",
  DATABASE_PASSWORD = "DATABASE_PASSWORD",
  NODE_ENV = "NODE_ENV",
}

// getting env variables based on what was declared
function getEnv(variableName: ENVIRONMENT_VARIABLES) {
  const envKey = ENVIRONMENT_VARIABLES[variableName];
  const foundEnv = process.env[envKey];
  const message = `${envKey} was not found!`;
  // check if incoming variable key exist
  if (!foundEnv) {
    console.log(message);
    throw Error(message);
  }
  return foundEnv;
}

// calls getEnv and define the env variables
const APP_CONFIGS = {
  DATABASE_NAME: getEnv(ENVIRONMENT_VARIABLES.DATABASE_NAME),
  DATABASE_USERNAME: getEnv(ENVIRONMENT_VARIABLES.DATABASE_USERNAME),
  DATABASE_PORT: getEnv(ENVIRONMENT_VARIABLES.DATABASE_PORT),
  DATABASE_PASSWORD: getEnv(ENVIRONMENT_VARIABLES.DATABASE_PASSWORD),
  DATABASE_HOST: getEnv(ENVIRONMENT_VARIABLES.DATABASE_HOST),
  SERVER_PORT: getEnv(ENVIRONMENT_VARIABLES.SERVER_PORT),
  NODE_ENV: getEnv(ENVIRONMENT_VARIABLES.NODE_ENV),
};

export default APP_CONFIGS