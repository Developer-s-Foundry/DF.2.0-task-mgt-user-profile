import express from 'express';

(async () => {
  const app: express.Application = express();

  app.listen(8000, () => {
    console.log('App is listening on port 8000');
  });
})();
