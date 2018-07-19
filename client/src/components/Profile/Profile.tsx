import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { IAuth } from 'src/state/state';

interface IProps {
  auth: IAuth;
}

const Profile = ({ auth: { fetchStatus, data, error } }: IProps) => {
  if (fetchStatus === 'done' && data === '') return <Redirect to="/" />;
  if (fetchStatus === 'error') return <div>{error}</div>;
  return <div>Profile</div>;
};

export default connect(({ auth }: IProps) => ({ auth }))(Profile);
