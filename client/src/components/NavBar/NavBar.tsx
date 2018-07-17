import * as React from 'react';
import { connect } from 'react-redux';

import { IAuth } from 'src/state/state';
import { logout } from 'src/actions/logout';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { navbar, header, buttons, button } from './NavBar.scss';

interface IProps {
  auth: IAuth;
  logout: ThunkActionFunctionCreator;
}

const NavBar = ({ auth, logout }: IProps) => (
  <div className={navbar}>
    <div className={header}>fcc-voting-app</div>

    <div className={buttons}>
      {auth.fetchStatus === 'done' && auth.data ? (
        <React.Fragment>
          <a className={button}>Profile</a>
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
