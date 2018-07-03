import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import User, { IUser } from '../models/User';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.serializeUser((user: IUser, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ githubID: profile.id });
        const user = existingUser || new User({ githubID: profile.id }).save();
        done(null, user);
      } catch (err) {
        console.error(err);
      }
    }
  )
);
