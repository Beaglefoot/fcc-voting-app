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
      R.over(
        R.lensProp('polls'),
        slice => ({
          ...slice,
          fetchStatus: 'error',
          error: 'Failed to fetch polls.'
        }),
        state
      ),
    done: (state: IState, res: AxiosResponse) =>
      R.over(
        R.lensProp('polls'),
        slice => ({ ...slice, fetchStatus: 'done', data: res.data }),
        state
      )
  }
});
