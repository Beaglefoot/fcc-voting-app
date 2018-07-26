import express from 'express';
import Poll, { IPoll } from '../../models/Poll';
import getIP from '../../helpers/getIP';

const addVote: express.Handler = async (req, res) => {
  const { pollID } = req.params;
  const { name } = req.body;
  let poll: IPoll;

  try {
    poll = await Poll.findById(pollID);

    const isVoted = poll.voters.some(({ user, ip }) => {
      if (req.user) return user && req.user.id === user.toString();
      return ip === getIP(req);
    });

    if (isVoted)
      throw Object.assign(new Error('Already voted.'), { httpStatusCode: 403 });

    if (
      req.isAuthenticated() &&
      !poll.options.some(option => option.name === name)
    ) {
      await Poll.findByIdAndUpdate(pollID, {
        $push: {
          options: { name }
        }
      });
    }

    await Poll.findOneAndUpdate(
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

    poll = await Poll.findById(pollID);
  } catch (err) {
    if (!err.httpStatusCode) err.httpStatusCode = 404;
    throw err;
  }

  res.send(poll);
};

export default addVote;
