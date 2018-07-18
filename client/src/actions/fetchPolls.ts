import * as R from 'ramda';
import { AxiosResponse } from 'axios';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const fetchPolls = getNetworkRequestActionCreator({
  url: '/api/polls',
  namePrefix: 'FETCH_POLLS',
  payload: {
    start: (state: IState) =>
      R.assocPath(['polls', 'fetchStatus'], 'pending', state),
    error: (state: IState) =>
      R.assoc(
        'polls',
        { fetchStatus: 'error', data: 'Failed to fetch polls.' },
        state
      ),
    done: (state: IState, response: AxiosResponse) =>
      R.assoc('polls', { fetchStatus: 'done', data: response.data }, state)
  }
});
