import { Router } from 'express';
import usersRouter from './users';
import pollsRouter from './polls';
import logout from '../controllers/auth/logout';
import currentUser from '../controllers/users/currentUser';
import authenticationCheck from '../controllers/auth/authenticationCheck';

const router = Router();

router.use('/users', usersRouter);
router.use('/polls', pollsRouter);
router.get('/logout', logout);
router.get('/current_user', currentUser);
router.get('/authentication_check', authenticationCheck);

export default router;
