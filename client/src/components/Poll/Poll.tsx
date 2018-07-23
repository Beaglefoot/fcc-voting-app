import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

import Spinner from 'src/components/Spinner/Spinner';
import { TSelectedPoll } from 'src/state/state';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { fetchPoll } from 'src/actions/fetchPoll';
import { IPoll } from 'src/state/state';

import { poll, chart, title as titleClass } from './Poll.scss';

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
      <div className={poll}>
        <div style={{ width: '300px', height: '240px' }} className={chart}>
          <VictoryChart domainPadding={{ y: 20 }}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={['A', 'B', 'C', 'D']}
            />
            <VictoryAxis dependentAxis tickCount={4} />
            <VictoryBar
              horizontal
              style={{
                data: { fill: 'yellowgreen' }
              }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 4 }
              ]}
            />
          </VictoryChart>
        </div>

        {{
          done: () => {
            if (!data) return null;
            const { title, options } = data as IPoll;

            return (
              <React.Fragment>
                <h2 className={titleClass}>{title}</h2>
                {options.map(option => (
                  <div key={option.name}>{`${option.name} - ${
                    option.votes
                  }`}</div>
                ))}
              </React.Fragment>
            );
          },

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
