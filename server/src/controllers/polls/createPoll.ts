import express from 'express';
import Poll, { IPoll } from '../../models/Poll';
import User from '../../models/User';
import getIP from '../../helpers/getIP';
import throwUnauth from '../../helpers/throwUnauth';

const createPoll: express.Handler = async (req, res) => {
  if (!req.isAuthenticated()) throwUnauth();

  const fields = Object.assign({}, req.body, {
    author: { ip: getIP(req), user: req.user.id }
  });

  let poll: IPoll;

  try {
    poll = await new Poll({ ...fields }).save();
    await User.findByIdAndUpdate(req.user.id, { $push: { polls: poll._id } });
  } catch (err) {
    err.httpStatusCode = 400;
    throw err;
  }

  res.json(poll);
};

export default createPoll;
