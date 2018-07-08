import { Router } from 'express';
import asyncMiddleware from '../middleware/async';
import getPoll from '../controllers/polls/getPoll';
import createPoll from '../controllers/polls/createPoll';
import deletePoll from '../controllers/polls/deletePoll';
import addVote from '../controllers/polls/addVote';

const router = Router();

router.get('/:pollID', asyncMiddleware(getPoll));
router.delete('/:pollID', asyncMiddleware(deletePoll));
router.post('/:pollID/vote', asyncMiddleware(addVote));
router.post('/', asyncMiddleware(createPoll));

export default router;
