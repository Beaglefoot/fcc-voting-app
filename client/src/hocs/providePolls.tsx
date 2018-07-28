import * as React from 'react';
import { connect } from 'react-redux';

import { fetchPolls } from 'src/actions/fetchPolls';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { TPolls } from 'src/state/state';
import { deletePoll } from 'src/actions/deletePoll';

interface IPropsInjected {
  polls: TPolls;
  deletePoll: ThunkActionFunctionCreator;
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
        />
      );
    }
  }

  return connect(
    ({ polls }: IPropsExternal) => ({ polls }),
    { fetchPolls, deletePoll }
  )(WithPolls);
};

export default providePolls;
