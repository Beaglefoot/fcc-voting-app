import * as React from 'react';
import { connect } from 'react-redux';

import { fetchPolls } from 'src/actions/fetchPolls';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import {
  TPolls,
  IPollsDeletion,
  IState as IGlobalState
} from 'src/state/state';
import { deletePoll } from 'src/actions/deletePoll';

interface IPropsInjected {
  polls: TPolls;
  deletePoll: ThunkActionFunctionCreator;
  pollDeletion: IPollsDeletion;
}

interface IPropsExternal extends IPropsInjected {
  fetchPolls: ThunkActionFunctionCreator;
}

const providePolls = (url: string) => (
  Component:
    | React.ComponentClass<IPropsInjected>
    | React.StatelessComponent<IPropsInjected>
) => {
  class WithPolls extends React.Component<IPropsExternal> {
    componentDidMount() {
      this.props.fetchPolls(url);
    }

    render() {
      return (
        <Component
          {...this.props}
          polls={this.props.polls}
          deletePoll={this.props.deletePoll}
          pollDeletion={this.props.pollDeletion}
        />
      );
    }
  }

  return connect(
    ({ polls, pollDeletion }: IGlobalState) => ({ polls, pollDeletion }),
    { fetchPolls, deletePoll }
  )(WithPolls);
};

export default providePolls;
