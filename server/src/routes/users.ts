import { Router } from 'express';
import asyncMiddleware from '../middleware/async';
import getUser from '../controllers/users/getUser';
import getPolls from '../controllers/polls/getPolls';

const router = Router();

router.get('/:userID', asyncMiddleware(getUser));
router.get('/:userID/polls', asyncMiddleware(getPolls));

export default router;
