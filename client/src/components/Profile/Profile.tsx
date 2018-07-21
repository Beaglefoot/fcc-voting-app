import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { IAuth } from 'src/state/state';
import PollsList from 'src/components/PollsList/PollsList';
import providePolls from 'src/hocs/providePolls';

interface IProps {
  auth: IAuth;
}

let UserPolls: React.ComponentClass;

const Profile = ({ auth: { fetchStatus, data, error } }: IProps) => {
  if (!UserPolls && data)
    UserPolls = providePolls(`/api/users/${data._id}/polls`)(PollsList);

  if (fetchStatus === 'done' && data === '') return <Redirect to="/" />;
  if (fetchStatus === 'error') return <div>{error}</div>;
  return UserPolls ? <UserPolls /> : <div />;
};

export default connect(({ auth }: IProps) => ({ auth }))(Profile);
