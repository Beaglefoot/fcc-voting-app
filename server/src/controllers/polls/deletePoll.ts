import express from 'express';
import Poll, { IPoll } from '../../models/Poll';
import throwUnauth from '../../helpers/throwUnauth';

const deletePoll: express.Handler = async (req, res) => {
  if (!req.isAuthenticated()) throwUnauth();

  const { pollID } = req.params;
  let poll: IPoll;

  try {
    // To make pre hooks work several things have to be done
    // in this convoluted way.
    // https://github.com/Automattic/mongoose/issues/964
    poll = await ((): Promise<IPoll> =>
      new Promise(resolve => {
        Poll.findById(pollID, (err, poll) => {
          if (err) throw err;
          if (poll.author.user.toString() !== req.user.id) throwUnauth();

          poll.remove();
          resolve(poll);
        });
      }))();
  } catch (err) {
    if (!err.httpStatusCode) err.httpStatusCode = 400;
    throw err;
  }

  res.status(204).json(poll);
};

export default deletePoll;
