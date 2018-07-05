import express from 'express';
import User, { IUser } from '../../models/User';

const getUser: express.Handler = async (req, res) => {
  const { userID } = req.params;
  let user: IUser;

  try {
    user = await User.findById(userID);
  } catch (err) {
    err.httpStatusCode = 404;
    throw err;
  }

  res.send(user);
};

export default getUser;
