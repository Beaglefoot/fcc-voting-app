import express from 'express';
import Poll, { IPoll } from '../../models/Poll';

const addVote: express.Handler = async (req, res) => {
  const { pollID } = req.params;
  const { name } = req.body;
  let poll: IPoll;

  try {
    poll = await Poll.findOneAndUpdate(
      { _id: pollID, 'options.name': name },
      { $inc: { 'options.$.votes': 1 } }
    );

    if (!poll) throw new Error('Not found.');

    poll = await Poll.findById(pollID);
  } catch (err) {
    err.httpStatusCode = 404;
    throw err;
  }

  res.send(poll);
};

export default addVote;
