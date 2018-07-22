import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';

import Spinner from 'src/components/Spinner/Spinner';
import { TSelectedPoll } from 'src/state/state';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { fetchPoll } from 'src/actions/fetchPoll';

interface IProps {
  match: match<{ pollID: string }>;
  selectedPoll: TSelectedPoll;
  fetchPoll: ThunkActionFunctionCreator;
}

class Poll extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchPoll(`/api/polls/${this.props.match.params.pollID}`);
  }

  render() {
    const { fetchStatus, data, error } = this.props.selectedPoll;

    return (
      <div>
        {{
          done: () => JSON.stringify(data),
          pending: () => <Spinner />,
          error: () => <div>{error}</div>
        }[fetchStatus]()}
      </div>
    );
  }
}

export default connect(
  ({ selectedPoll }: IProps) => ({ selectedPoll }),
  { fetchPoll }
)(Poll);
