import * as React from 'react';
import { connect } from 'react-redux';

import { fetchPolls } from 'src/actions/fetchPolls';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { IPolls } from 'src/state/state';

interface IPropsInjected {
  polls: IPolls;
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
      return <Component {...this.props} polls={this.props.polls} />;
    }
  }

  return connect(
    ({ polls }: IPropsExternal) => ({ polls }),
    { fetchPolls }
  )(WithPolls);
};

export default providePolls;
