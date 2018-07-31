import * as R from 'ramda';
import { AxiosResponse } from 'axios';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const createPoll = getNetworkRequestActionCreator({
  url: '/api/polls',
  namePrefix: 'CREATE_POLL',
  config: { method: 'POST' },
  payload: {
    start: (state: IState) =>
      R.assocPath(['pollCreation', 'fetchStatus'], 'pending', state),

    error: (state: IState) =>
      R.over(
        R.lensProp('pollCreation'),
        slice => ({
          ...slice,
          fetchStatus: 'error',
          error: 'Failed to fetch vote.'
        }),
        state
      ),

    done: (state: IState, res: AxiosResponse) =>
      R.compose(
        R.over(R.lensPath(['auth', 'data', 'polls']), slice => ({
          ...slice,
          [res.data._id]: res.data._id
        })),

        R.over(R.lensProp('pollCreation'), slice => ({
          ...slice,
          fetchStatus: 'done',
          data: res.data
        }))
      )(state)
  }
});
