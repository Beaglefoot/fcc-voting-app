import { Router } from 'express';
import renderMainPage from '../controllers/renderMainPage';
import logout from '../controllers/auth/logout';
import authenticationCheck from '../controllers/auth/authenticationCheck';

const router = Router();

router.get('/', renderMainPage);
router.get('/logout', logout);
router.get('/authentication_check', authenticationCheck);

export default router;
