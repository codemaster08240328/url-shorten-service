import { Express } from 'express';

import { redirectToUrl, postUrl } from '../controller/UrlController';

export default function initRoutes(app: Express) {
  app.get('/:hash', redirectToUrl);
  app.post('/shorten', postUrl);
}
