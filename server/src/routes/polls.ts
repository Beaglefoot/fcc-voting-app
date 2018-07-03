import { Router } from 'express';
import Poll from '../models/Poll';

const router = Router();

router.get('/:pollID', async (req, res) => {
  const { pollID } = req.params;

  const poll = await Poll.findById(pollID);
  console.log(poll);
  res.send(poll);
});

router.post('/', async (req, res) => {
  const { ...poll } = req.body;

  const { _id } = await new Poll({ ...poll }).save();

  res.send(`Created a poll with id: ${_id}`);
});

export default router;
