import { Router } from 'express';
import getUser from '../controllers/users/getUser';

const router = Router();

router.get('/:userID', getUser);

export default router;
