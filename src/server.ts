import { databaseConfig } from './common/config/database';
import { APP_CONFIGS } from './common/config/index';
import { expressConfig } from './common/config/express';
import { RegisterRoutes } from './routes/routes';
import express from 'express';
import { ErrorRequestHandler } from 'express';
import { errorHandler } from './middlewares/errorMiddleware';

// IIFE
(async () => {
  const app: express.Application = express();
  expressConfig(app);
  RegisterRoutes(app);
  app.use(errorHandler as ErrorRequestHandler);
  databaseConfig
    .initialize()
    .then(() => {
      console.log('Connected to DB');

      app.listen(APP_CONFIGS.SERVER_PORT, () => {
        console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
      });
    })
    .catch((error) => {
      console.error('DB connection error:', error);
    });
})();
