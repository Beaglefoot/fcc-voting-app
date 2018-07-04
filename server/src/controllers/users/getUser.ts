import express from 'express';
import User from '../../models/User';

const getUser: express.Handler = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);
  res.send(user);
};

export default getUser;
