import express from 'express';
import Poll from '../../models/Poll';

const createPoll: express.Handler = async (req, res) => {
  const { ...poll } = req.body;
  const { _id } = await new Poll({ ...poll }).save();

  res.send(`Created a poll with id: ${_id}`);
};

export default createPoll;
