import express from 'express';
import Poll, { IPoll } from '../../models/Poll';
import getIP from '../../helpers/getIP';

const createPoll: express.Handler = async (req, res) => {
  const fields = Object.assign({}, req.body, { author: { ip: getIP(req) } });
  let poll: IPoll;

  try {
    poll = await new Poll({ ...fields }).save();
  } catch (err) {
    err.httpStatusCode = 400;
    throw err;
  }

  res.json(poll);
};

export default createPoll;
