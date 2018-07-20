import express from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../../models/User';
import Poll, { IPoll } from '../../models/Poll';

const getPolls: express.Handler = async (req, res) => {
  const { userID } = req.params;
  let polls: IPoll[] | any;

  try {
    polls = userID
      ? await User.aggregate([
          { $match: { _id: mongoose.Types.ObjectId(userID) } },
          { $project: { polls: '$polls', _id: false } },
          { $unwind: '$polls' },
          {
            $lookup: {
              from: 'polls',
              foreignField: '_id',
              localField: 'polls',
              as: 'poll'
            }
          },
          { $unwind: '$poll' },
          {
            $project: {
              _id: '$poll._id',
              title: '$poll.title',
              votesCount: { $size: '$poll.voters' }
            }
          }
        ])
      : await Poll.aggregate([
          { $project: { title: true, votesCount: { $size: '$voters' } } }
        ]);
  } catch (err) {
    err.httpStatusCode = 404;
    throw err;
  }

  res.send(polls);
};

export default getPolls;
