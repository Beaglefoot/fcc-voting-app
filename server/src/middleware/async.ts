import { Handler } from 'express';

type HigherOrderMiddleware = (middleware: Handler) => Handler;

const asyncMiddleware: HigherOrderMiddleware = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(err => {
    res.status(err.httpStatusCode).json({ error: err.message });
    next(err);
  });

export default asyncMiddleware;
