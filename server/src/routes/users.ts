import { Router } from 'express';
import asyncMiddleware from '../middleware/async';
import getUser from '../controllers/users/getUser';

const router = Router();

router.get('/:userID', asyncMiddleware(getUser));

export default router;
