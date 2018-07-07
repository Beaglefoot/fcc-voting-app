import express from 'express';
import Poll, { IPoll } from '../../models/Poll';

const deletePoll: express.Handler = async (req, res) => {
  if (!req.isAuthenticated()) {
    throw Object.assign(new Error('Unauthorized access.'), {
      httpStatusCode: 401
    });
  }

  const { pollID } = req.params;
  let poll: IPoll;

  try {
    poll = await Poll.findById(pollID);

    if (poll.author.user.toString() !== req.user.id) {
      throw Object.assign(new Error('Unauthorized access.'), {
        httpStatusCode: 401
      });
    }

    poll = await Poll.findByIdAndRemove(pollID);
  } catch (err) {
    if (!err.httpStatusCode) err.httpStatusCode = 400;
    throw err;
  }

  res.json(poll);
};

export default deletePoll;
