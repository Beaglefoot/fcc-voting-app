import { Router } from 'express';
import asyncMiddleware from '../middleware/async';
import getPoll from '../controllers/polls/getPoll';
import createPoll from '../controllers/polls/createPoll';
import deletePoll from '../controllers/polls/deletePoll';

const router = Router();

router.get('/:pollID', asyncMiddleware(getPoll));
router.delete('/:pollID', asyncMiddleware(deletePoll));
router.post('/', asyncMiddleware(createPoll));

export default router;
