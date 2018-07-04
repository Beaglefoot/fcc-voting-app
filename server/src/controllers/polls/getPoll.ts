import express from 'express';
import Poll from '../../models/Poll';

const getPoll: express.Handler = async (req, res) => {
  const { pollID } = req.params;

  const poll = await Poll.findById(pollID);
  console.log(poll);
  res.send(poll);
};

export default getPoll;
