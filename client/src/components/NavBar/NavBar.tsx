import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

import { TAuth } from 'src/state/state';
import { logout } from 'src/actions/logout';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { navbar, header, buttons, button } from './NavBar.scss';

interface IProps {
  auth: TAuth;
  logout: ThunkActionFunctionCreator;
}

const NavBar = ({ auth, logout }: IProps) => (
  <div className={navbar}>
    <Link to="/" className={header}>
      fcc-voting-app
    </Link>

    <div className={buttons}>
      {auth.fetchStatus === 'done' && auth.data._id ? (
        <React.Fragment>
          <Switch>
            <Route path="/create_poll" />
            <Route
              render={() => (
                <Link to="/create_poll" className={button}>
                  Create Poll
                </Link>
              )}
            />
          </Switch>

          <Switch>
            <Route path="/profile" />
            <Route
              render={() => (
                <Link to="/profile" className={button}>
                  Profile
                </Link>
              )}
            />
          </Switch>

          <a
            className={button}
            href="/api/logout"
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </a>
        </React.Fragment>
      ) : (
        <a className={button} href="/auth/github">
          Sign in with GitHub
        </a>
      )}
    </div>
  </div>
);

export default connect(
  ({ auth }: IProps) => ({ auth }),
  { logout }
)(NavBar);
