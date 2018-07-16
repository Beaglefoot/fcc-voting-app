import * as React from 'react';
import { connect } from 'react-redux';

import { IAuth } from 'src/state/state';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { fetchUser } from 'src/actions/fetchUser';
import { container } from './App.scss';

export interface IProps {
  auth: IAuth;
  fetchUser: ThunkActionFunctionCreator;
}

class App extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { fetchStatus, data } = this.props.auth;

    return (
      <div className={container}>
        <h1>fcc-voting-app</h1>
        <p>
          {
            {
              done: `You are ${data ? '' : 'not '} authenicated`,
              error: data,
              pending: 'Loading...'
            }[fetchStatus]
          }
        </p>
        <a href="/auth/github">Auth</a>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }: IProps) => ({ auth });

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
