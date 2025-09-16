import express from 'express';
import { databaseConfig } from './common/config/database';
import { APP_CONFIGS } from './common/config/index';
import userRoutes from './routes/user_routes';

const app: express.Application = express();

databaseConfig
  .initialize()
  .then(() => {
    console.log('Connected to DB');

    app.use('/', userRoutes);


    app.listen(APP_CONFIGS.SERVER_PORT, () => {
      console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });
