import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/:userID', async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById(userID);
  console.log(user);
  res.send(user);
});

export default router;
