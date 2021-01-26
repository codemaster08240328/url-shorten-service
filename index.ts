import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import betterLogging from 'better-logging';
import initRoutes from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend/dist')));

initRoutes(app);

// better logging
betterLogging(console);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).send();
});

// error handler
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return next();
  }

  res.status(500).send(error);

  return undefined;
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
