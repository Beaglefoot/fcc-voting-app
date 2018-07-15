import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github'));
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api/',
    successRedirect: '/api/authentication_check'
  })
);

export default router;
