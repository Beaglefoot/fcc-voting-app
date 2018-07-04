import { Router } from 'express';
import getPoll from '../controllers/polls/getPoll';
import createPoll from '../controllers/polls/createPoll';

const router = Router();

router.get('/:pollID', getPoll);
router.post('/', createPoll);

export default router;
