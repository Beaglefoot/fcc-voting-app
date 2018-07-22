import * as R from 'ramda';
import { AxiosResponse } from 'axios';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const fetchPoll = getNetworkRequestActionCreator({
  namePrefix: 'FETCH_POLL',
  payload: {
    start: (state: IState) =>
      R.assocPath(['selectedPoll', 'fetchStatus'], 'pending', state),
    error: (state: IState) =>
      R.over(
        R.lensProp('selectedPoll'),
        slice => ({
          ...slice,
          fetchStatus: 'error',
          error: 'Failed to fetch poll.'
        }),
        state
      ),
    done: (state: IState, res: AxiosResponse) =>
      R.over(
        R.lensProp('selectedPoll'),
        slice => ({ ...slice, fetchStatus: 'done', data: res.data }),
        state
      )
  }
});
