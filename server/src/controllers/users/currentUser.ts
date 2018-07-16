import express from 'express';

const currentUser: express.Handler = (req, res) => {
  res.send(req.user);
};

export default currentUser;
