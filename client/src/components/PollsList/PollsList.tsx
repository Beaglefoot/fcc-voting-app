import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  TPolls,
  TAuth,
  IState as IGlobalState,
  IPollsDeletion
} from 'src/state/state';
import Spinner from 'src/components/Spinner/Spinner';
import {
  pollsList,
  listItem,
  link,
  cross,
  smallSpinner
} from './PollsList.scss';
import { ThunkActionFunctionCreator } from 'src/actions/actions';

interface IProps {
  polls: TPolls;
  auth: TAuth;
  deletePoll: ThunkActionFunctionCreator;
  pollDeletion: IPollsDeletion;
}

const PollsList = ({
  polls: { fetchStatus, data, error },
  auth,
  deletePoll,
  pollDeletion
}: IProps) => (
  <ul className={pollsList}>
    {{
      done: () =>
        data.map(poll => (
          <li className={listItem} key={poll._id}>
            <Link className={link} to={`/poll/${poll._id}`}>
              {`${poll.title} (${poll.votesCount})`}
            </Link>

            {auth.data.polls &&
              auth.data.polls[poll._id] &&
              (pollDeletion[poll._id] ? (
                <Spinner className={smallSpinner} />
              ) : (
                <div
                  className={cross}
                  onClick={() => {
                    deletePoll(poll._id);
                  }}
                >
                  ✖
                </div>
              ))}
          </li>
        )),
      pending: () => <Spinner />,
      error: () => <div>{error}</div>
    }[fetchStatus]()}
  </ul>
);

export default connect(({ auth }: IGlobalState) => ({ auth }))(PollsList);
