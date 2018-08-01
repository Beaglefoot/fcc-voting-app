import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { fetchUser } from 'src/actions/fetchUser';
import { container } from './App.scss';

import NavBar from 'src/components/NavBar/NavBar';
import PollsList from 'src/components/PollsList/PollsList';
import Profile from 'src/components/Profile/Profile';
import CreatePoll from 'src/components/CreatePoll/CreatePoll';
import providePolls from 'src/hocs/providePolls';
import Poll from 'src/components/Poll/Poll';

interface IProps {
  fetchUser: ThunkActionFunctionCreator;
}

const AllPolls = providePolls('/api/polls')(PollsList);

class App extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className={container}>
          <Route component={NavBar} />

          <Route exact path="/" component={AllPolls} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/create_poll" component={CreatePoll} />
          <Route exact path="/polls/:pollID" component={Poll} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
