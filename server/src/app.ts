import express from 'express';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import passport from 'passport';
import logger from './middleware/logger';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import redirectToWebpack from './controllers/redirectToWebpack';

import './services/passport';

const { MONGO_URI, SESSION_SECRET, NODE_ENV } = process.env;
const MILLISECONDS_IN_ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
const clientDistDir = __dirname + '/../../client/dist/';

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .catch(err => console.error('Failed to connect to DB:', err));

const app = express();

app.use(logger);
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    maxAge: MILLISECONDS_IN_ONE_MONTH,
    keys: [SESSION_SECRET]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api/', apiRouter);

if (NODE_ENV === 'production') app.use(express.static(clientDistDir));
else app.get('/', redirectToWebpack);

export default app;
