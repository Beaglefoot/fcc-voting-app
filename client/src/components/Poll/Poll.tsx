import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { VictoryPie } from 'victory';

import Spinner from 'src/components/Spinner/Spinner';
import Options from 'src/components/Options/Options';
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
  fontColor: string = '';

  componentDidMount() {
    this.props.fetchPoll(`/api/polls/${this.props.match.params.pollID}`);
  }

  render() {
    const { fetchStatus, data, error } = this.props.selectedPoll;

    return (
      <div
        className={poll}
        ref={e => {
          if (e instanceof Element) {
            this.fontColor = getComputedStyle(e).color;
          }
        }}
      >
        {{
          done: () => {
            if (!data) return null;
            const { title, options } = data as IPoll;

            return (
              <React.Fragment>
                <h2 className={titleClass}>{title}</h2>

                <div className={chart}>
                  <VictoryPie
                    colorScale="cool"
                    innerRadius={100}
                    style={{
                      labels: {
                        fontSize: 22,
                        fill: this.fontColor
                      }
                    }}
                    data={options.map(({ name: x, votes: y }) => ({ x, y }))}
                    labels={d => (d.y ? `${d.x}: ${d.y}` : '')}
                  />
                </div>

                <Options options={options} />
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
