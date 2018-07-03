import express from 'express';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import passport from 'passport';
import logger from './middleware/logger';
import authRouter from './routes/auth';

import './services/passport';

const { MONGO_URI, SESSION_SECRET } = process.env;

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .catch(err => console.error('Failed to connect to DB:', err));

const app = express();

app.set('view engine', 'ejs');
app.use(logger);
app.use(express.static('public'));
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [SESSION_SECRET]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.get('/', (_, res) => {
  res.render('index', {}, (err, html) => {
    res.send(html);
  });
});

export default app;
