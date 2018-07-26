import express from 'express';
import getIP from '../../helpers/getIP';

const currentUser: express.Handler = (req, res) => {
  res.send(Object.assign({ ip: getIP(req) }, req.user && req.user.toObject()));
};

export default currentUser;
