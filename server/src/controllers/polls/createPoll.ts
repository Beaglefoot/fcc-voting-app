import express from 'express';
import Poll, { IPoll } from '../../models/Poll';

const createPoll: express.Handler = async (req, res) => {
  const { ...fields } = req.body;
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
