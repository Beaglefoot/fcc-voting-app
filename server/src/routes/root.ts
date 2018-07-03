import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.render('index', {}, (err, html) => {
    res.send(html);
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/authorization_test', (req, res) => {
  res.send(req.isAuthenticated());
});

export default router;
