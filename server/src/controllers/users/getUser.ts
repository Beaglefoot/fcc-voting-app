import express from 'express';
import User, { IUser } from '../../models/User';
import throwUnauth from '../../helpers/throwUnauth';

const getUser: express.Handler = async (req, res) => {
  const { userID } = req.params;

  if (!req.isAuthenticated() || req.user.id !== userID) {
    throwUnauth();
  }

  let user: IUser;

  try {
    user = await User.findById(userID).populate('polls');
  } catch (err) {
    err.httpStatusCode = 404;
    throw err;
  }

  res.send(user);
};

export default getUser;
