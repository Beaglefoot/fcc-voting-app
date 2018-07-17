import * as React from 'react';
import { connect } from 'react-redux';

import { IAuth } from 'src/state/state';
import { navbar, header, buttons, button } from './NavBar.scss';

interface IProps {
  auth: IAuth;
}

const NavBar = ({ auth }: IProps) => (
  <div className={navbar}>
    <div className={header}>fcc-voting-app</div>
    <div className={buttons}>
      {auth.fetchStatus === 'done' && auth.data ? (
        <React.Fragment>
          <button className={button}>Profile</button>
          <button className={button}>Logout</button>
        </React.Fragment>
      ) : (
        <button className={button}>Sign in with GitHub</button>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ auth }: IProps) => ({ auth });

export default connect(mapStateToProps)(NavBar);
