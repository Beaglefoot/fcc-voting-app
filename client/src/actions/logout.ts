import * as R from 'ramda';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const logout = getNetworkRequestActionCreator({
  url: '/api/logout',
  namePrefix: 'LOGOUT',
  payload: {
    start: (state: IState) =>
      R.assoc('auth', { fetchStatus: 'pending' }, state),
    error: (state: IState) =>
      R.assoc(
        'auth',
        { fetchStatus: 'error', data: 'Failed to logout.' },
        state
      ),
    done: (state: IState) =>
      R.assoc('auth', { fetchStatus: 'done', data: null }, state)
  }
});
