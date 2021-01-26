import { Express } from 'express';
import apiRoutes from './api_routes';

export default function initRoutes(app: Express) {
  apiRoutes(app);
}
