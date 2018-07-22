import * as React from 'react';
import { Link } from 'react-router-dom';

import { TPolls } from 'src/state/state';
import Spinner from 'src/components/Spinner/Spinner';
import { pollsList, listItem, link } from './PollsList.scss';

interface IProps {
  polls: TPolls;
}

const PollsList = ({ polls: { fetchStatus, data, error } }: IProps) => (
  <ul className={pollsList}>
    {{
      done: () =>
        data.map(poll => (
          <li className={listItem} key={poll._id}>
            <Link className={link} to={`/poll/${poll._id}`}>{`${poll.title} (${
              poll.votesCount
            })`}</Link>
          </li>
        )),
      pending: () => <Spinner />,
      error: () => <div>{error}</div>
    }[fetchStatus]()}
  </ul>
);

export default PollsList;
