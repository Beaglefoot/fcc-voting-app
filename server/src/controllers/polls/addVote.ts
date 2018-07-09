import express from 'express';
import Poll, { IPoll } from '../../models/Poll';
import getIP from '../../helpers/getIP';

const addVote: express.Handler = async (req, res) => {
  const { pollID } = req.params;
  const { name } = req.body;
  let poll: IPoll;

  try {
    const isVoted = Boolean(
      await Poll.findOne(
        Object.assign(
          { _id: pollID },
          req.user
            ? { 'voters.user': req.user.id }
            : { 'voters.ip': getIP(req) }
        )
      )
    );

    if (isVoted)
      throw Object.assign(new Error('Already voted.'), { httpStatusCode: 403 });

    poll = await Poll.findOneAndUpdate(
      { _id: pollID, 'options.name': name },
      {
        $inc: { 'options.$.votes': 1 },
        $push: {
          voters: Object.assign(
            { ip: getIP(req) },
            req.user ? { user: req.user.id } : {}
          )
        }
      }
    );

    if (!poll) throw new Error('Not found.');

    poll = await Poll.findById(pollID);
  } catch (err) {
    if (!err.httpStatusCode) err.httpStatusCode = 404;
    throw err;
  }

  res.send(poll);
};

export default addVote;
