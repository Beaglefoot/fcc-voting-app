import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, 'test');
    }
  )
);
