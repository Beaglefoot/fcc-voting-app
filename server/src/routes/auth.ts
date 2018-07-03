import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/authorization_test', (req, res) => {
  res.send(req.isAuthenticated());
});
router.get('/github', passport.authenticate('github'));
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    successRedirect: '/auth/authorization_test'
  })
);

export default router;
