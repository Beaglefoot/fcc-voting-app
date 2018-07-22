import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { IAuth } from 'src/state/state';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { fetchUser } from 'src/actions/fetchUser';
import { container } from './App.scss';

import NavBar from 'src/components/NavBar/NavBar';
import PollsList from 'src/components/PollsList/PollsList';
import Profile from 'src/components/Profile/Profile';
import providePolls from 'src/hocs/providePolls';
import Poll from 'src/components/Poll/Poll';

interface IProps {
  auth: IAuth;
  fetchUser: ThunkActionFunctionCreator;
}

const AllPolls = providePolls('/api/polls')(PollsList);

class App extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { fetchStatus, data, error } = this.props.auth;

    return (
      <BrowserRouter>
        <div className={container}>
          <Route component={NavBar} />

          <div style={{ padding: '1rem' }}>
            {
              {
                done: `You are ${data ? '' : 'not '} authenicated`,
                error,
                pending: 'Loading...'
              }[fetchStatus]
            }
          </div>

          <Route exact path="/" component={AllPolls} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/poll/:pollID" component={Poll} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }: IProps) => ({ auth });

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
