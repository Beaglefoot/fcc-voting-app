import express from 'express';
import Poll, { IPoll } from '../../models/Poll';

const getPoll: express.Handler = async (req, res) => {
  const { pollID } = req.params;
  let poll: IPoll;

  try {
    poll = await Poll.findById(pollID);
  } catch (err) {
    err.httpStatusCode = 404;
    throw err;
  }

  res.send(poll);
};

export default getPoll;
