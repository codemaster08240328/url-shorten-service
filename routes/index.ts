import { Express } from 'express';
import apiRoutes from './api_routes';
import staticRoutes from './static_routes';

export default function initRoutes(app: Express) {
  apiRoutes(app);
  staticRoutes(app);
}
