import express from 'express';

const authenticationCheck: express.Handler = (req, res) => {
  res.send(req.isAuthenticated() ? 'Authenticated' : 'Not authenticated');
};

export default authenticationCheck;
