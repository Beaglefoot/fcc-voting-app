import * as R from 'ramda';
import { AxiosResponse } from 'axios';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const fetchVote = getNetworkRequestActionCreator({
  namePrefix: 'FETCH_VOTE',
  config: { method: 'POST' },
  payload: {
    start: (state: IState) =>
      R.assocPath(['vote', 'fetchStatus'], 'pending', state),

    error: (state: IState) =>
      R.over(
        R.lensProp('vote'),
        slice => ({
          ...slice,
          fetchStatus: 'error',
          error: 'Failed to fetch vote.'
        }),
        state
      ),

    done: (state: IState, res: AxiosResponse) =>
      R.compose(
        R.assocPath(['selectedPoll', 'data'], res.data),
        R.assocPath(['vote', 'fetchStatus'], 'done')
      )(state)
  }
});
