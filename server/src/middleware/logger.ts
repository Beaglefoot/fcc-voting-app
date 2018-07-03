import { RequestHandler } from 'express';

const logger: RequestHandler = (req, _, next) => {
  console.log(`\x1b[33m--- ${req.method} ---\x1b[0m`);
  next();
};

export default logger;
