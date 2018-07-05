import { Router } from 'express';
import asyncMiddleware from '../middleware/async';
import getPoll from '../controllers/polls/getPoll';
import createPoll from '../controllers/polls/createPoll';

const router = Router();

router.get('/:pollID', asyncMiddleware(getPoll));
router.post('/', asyncMiddleware(createPoll));

export default router;
