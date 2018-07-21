import * as React from 'react';

import { IPolls } from 'src/state/state';
import Spinner from 'src/components/Spinner/Spinner';
import { pollsList, listItem } from './PollsList.scss';

interface IProps {
  polls: IPolls;
}

const PollsList = ({ polls: { fetchStatus, data, error } }: IProps) => (
  <ul className={pollsList}>
    {{
      done: () =>
        data.map(poll => (
          <li className={listItem} key={poll._id}>{`${poll.title} (${
            poll.votesCount
          })`}</li>
        )),
      pending: () => <Spinner />,
      error: () => <div>{error}</div>
    }[fetchStatus]()}
  </ul>
);

export default PollsList;
