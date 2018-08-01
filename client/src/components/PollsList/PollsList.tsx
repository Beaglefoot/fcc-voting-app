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
import Alert from 'src/components/Alert/Alert';
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

interface IState {
  confirmation: {
    isShown: boolean;
    pollTitle?: string;
    pollID?: string;
  };
}

class PollsList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      confirmation: {
        isShown: false
      }
    };
  }

  showAlert(pollID: string, pollTitle: string) {
    this.setState(() => ({
      confirmation: { isShown: true, pollTitle, pollID }
    }));
  }

  hideAlert = () => this.setState(() => ({ confirmation: { isShown: false } }));

  render() {
    const {
      polls: { fetchStatus, data, error },
      auth,
      deletePoll,
      pollDeletion
    } = this.props;

    const { confirmation } = this.state;

    return (
      <ul className={pollsList}>
        {{
          done: () =>
            data.map(poll => (
              <li className={listItem} key={poll._id}>
                <Link className={link} to={`/polls/${poll._id}`}>
                  {`${poll.title} (${poll.votesCount})`}
                </Link>

                {auth.data.polls &&
                  auth.data.polls[poll._id] &&
                  (pollDeletion[poll._id] ? (
                    <Spinner className={smallSpinner} />
                  ) : (
                    <div
                      className={cross}
                      onClick={() => this.showAlert(poll._id, poll.title)}
                    >
                      ✖
                    </div>
                  ))}
              </li>
            )),
          pending: () => <Spinner />,
          error: () => <div>{error}</div>
        }[fetchStatus]()}

        {confirmation.isShown && (
          <Alert
            onOk={() => {
              deletePoll(confirmation.pollID);
              this.hideAlert();
            }}
            onCancel={this.hideAlert}
          >
            {`This will delete the poll named "${
              confirmation.pollTitle
            }". Continue?`}
          </Alert>
        )}
      </ul>
    );
  }
}

export default connect(({ auth }: IGlobalState) => ({ auth }))(PollsList);
