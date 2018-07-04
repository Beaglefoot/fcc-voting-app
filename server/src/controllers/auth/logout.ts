import express from 'express';

const logout: express.Handler = (req, res) => {
  req.logout();
  res.redirect('/');
};

export default logout;
