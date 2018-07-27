import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { TPolls, TAuth, IState as IGlobalState } from 'src/state/state';
import Spinner from 'src/components/Spinner/Spinner';
import { pollsList, listItem, link, cross } from './PollsList.scss';

interface IProps {
  polls: TPolls;
  auth: TAuth;
}

const PollsList = ({ polls: { fetchStatus, data, error }, auth }: IProps) => (
  <ul className={pollsList}>
    {{
      done: () =>
        data.map(poll => (
          <li className={listItem} key={poll._id}>
            <Link className={link} to={`/poll/${poll._id}`}>{`${poll.title} (${
              poll.votesCount
            })`}</Link>
            {auth.data.polls &&
              auth.data.polls[poll._id] && (
                <div className={cross} onClick={() => console.log(poll._id)}>
                  ✖
                </div>
              )}
          </li>
        )),
      pending: () => <Spinner />,
      error: () => <div>{error}</div>
    }[fetchStatus]()}
  </ul>
);

export default connect(({ auth }: IGlobalState) => ({ auth }))(PollsList);
