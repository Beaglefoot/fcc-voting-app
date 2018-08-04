import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { fetchUser } from 'src/actions/fetchUser';
import { container } from './App.scss';

import NavBar from 'src/components/NavBar/NavBar';
import PollsList from 'src/components/PollsList/PollsList';
import Profile from 'src/components/Profile/Profile';
import CreatePoll from 'src/components/CreatePoll/CreatePoll';
import providePolls from 'src/hocs/providePolls';
import Poll from 'src/components/Poll/Poll';
import NotFound from 'src/components/NotFound/NotFound';

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

          <Switch>
            <Route exact path="/" component={AllPolls} />
            <Route path="/profile" component={Profile} />
            <Route path="/create_poll" component={CreatePoll} />
            <Route path="/polls/:pollID" component={Poll} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
