import * as R from 'ramda';
import { AxiosResponse } from 'axios';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const logout = getNetworkRequestActionCreator({
  url: '/api/logout',
  namePrefix: 'LOGOUT',
  payload: {
    start: (state: IState) =>
      R.assocPath(['auth', 'fetchStatus'], 'pending', state),
    error: (state: IState) =>
      R.over(
        R.lensProp('auth'),
        slice => ({
          ...slice,
          fetchStatus: 'error',
          error: 'Failed to logout.'
        }),
        state
      ),
    done: (state: IState, res: AxiosResponse) =>
      R.over(
        R.lensProp('auth'),
        slice => ({
          ...slice,
          fetchStatus: 'done',
          data: { ip: slice.data.ip }
        }),
        state
      )
  }
});
