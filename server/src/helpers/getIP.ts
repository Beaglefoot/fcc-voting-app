import express from 'express';

const getIP = (req: express.Request): string =>
  (req.get('x-forwarded-for') || req.ip)
    .split(',')[0]
    .replace(/^.*?((?:\d{1,3}\.){3}\d{1,3}).*$/, '$1');

export default getIP;
