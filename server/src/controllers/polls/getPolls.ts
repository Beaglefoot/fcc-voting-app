import express from 'express';
import Poll, { IPoll } from '../../models/Poll';

const getPolls: express.Handler = async (req, res) => {
  let polls: IPoll[];

  try {
    polls = await Poll.aggregate([
      { $project: { title: true, votesCount: { $size: '$voters' } } }
    ]);
  } catch (err) {
    err.httpStatusCode = 404;
    throw err;
  }

  res.send(polls);
};

export default getPolls;
