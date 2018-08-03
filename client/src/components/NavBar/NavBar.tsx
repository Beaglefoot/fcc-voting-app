import * as React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouterProps } from 'react-router';

import { TAuth } from 'src/state/state';
import { logout } from 'src/actions/logout';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { navbar, header, buttons, button, active } from './NavBar.scss';

interface IProps extends RouterProps {
  auth: TAuth;
  logout: ThunkActionFunctionCreator;
}

const routesMap = {
  createPoll: { url: '/create_poll', text: 'Create Poll' },
  profile: { url: '/profile', text: 'My Polls' },
  logout: { url: '/api/logout', text: 'Logout' },
  signin: { url: '/auth/github', text: 'Sign in with GitHub' }
};

const NavBar = ({ auth, logout, history }: IProps) => (
  <div className={navbar}>
    <Link to="/" className={header}>
      fcc-voting-app
    </Link>

    <div className={buttons}>
      {auth.fetchStatus === 'done' && auth.data._id ? (
        <React.Fragment>
          <Link
            to={routesMap.createPoll.url}
            className={classNames(
              button,
              history.location.pathname === routesMap.createPoll.url && active
            )}
          >
            {routesMap.createPoll.text}
          </Link>

          <Link
            to={routesMap.profile.url}
            className={classNames(
              button,
              history.location.pathname === routesMap.profile.url && active
            )}
          >
            {routesMap.profile.text}
          </Link>

          <a
            className={button}
            href={routesMap.logout.url}
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            {routesMap.logout.text}
          </a>
        </React.Fragment>
      ) : (
        <a className={button} href={routesMap.signin.url}>
          {routesMap.signin.text}
        </a>
      )}
    </div>
  </div>
);

export default connect(
  ({ auth }: IProps) => ({ auth }),
  { logout }
)(NavBar);
