import * as React from 'react';
import { connect } from 'react-redux';

import { fetchPolls } from 'src/actions/fetchPolls';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { IPolls } from 'src/state/state';
import Spinner from 'src/components/Spinner/Spinner';

import { record } from './PollsList.scss';

interface IProps {
  polls: IPolls;
  fetchPolls: ThunkActionFunctionCreator;
}

class PollsList extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchPolls();
  }

  render() {
    const {
      polls: { fetchStatus, data, error }
    } = this.props;

    return (
      <div>
        {{
          done: () =>
            data.map(poll => (
              <div className={record} key={poll._id}>{`${poll.title} (${
                poll.votesCount
              })`}</div>
            )),
          pending: () => <Spinner />,
          error: () => <div>{error}</div>
        }[fetchStatus]()}
      </div>
    );
  }
}

export default connect(
  ({ polls }: IProps) => ({ polls }),
  { fetchPolls }
)(PollsList);
