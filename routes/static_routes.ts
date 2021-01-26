import { Express, Request, Response } from 'express';

export default function initRoutes(app: Express) {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(__dirname, '/dist/index.html');
  });
}
