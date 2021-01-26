import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import UrlModel from '../model/UrlModel';
import urlShorten from '../service/url_shorten';

const urlModel = new UrlModel();

const urlValidationSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['https', 'http'] })
    .trim()
    .required(),
});

export function postUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { error, value } = urlValidationSchema.validate({ url: req.body.url });

    if (error) {
      res.status(400).send(JSON.stringify({ msg: 'Invalid Url' }));
    }

    console.info('Get POST Request with', value.url);

    const availableCount = urlModel.getCount() + 1;

    const hash = urlShorten(availableCount);
    urlModel.add(hash, value.url);

    const response = {
      url: value.url,
      short_url: hash,
    };

    res.status(201).send(JSON.stringify(response));
  } catch (err) {
    console.error('Error happened', err);

    next(err);
  }
}

export function redirectToUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const shortUrl = req.params.hash;
    console.info('Get GET request with', shortUrl);

    const fullUrl = urlModel.get(shortUrl);

    if (!fullUrl) {
      res.status(404).send(JSON.stringify({ msg: 'Wrong Url' }));
    } else {
      console.info('Server is permanently redirecting to ', fullUrl);
      res.redirect(302, fullUrl);
    }
  } catch (err) {
    console.error('Error happened', err);

    next(err);
  }
}
