import * as R from 'ramda';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const fetchUser = getNetworkRequestActionCreator({
  url: '/api/current_user',
  namePrefix: 'FETCH_USER',
  payload: {
    start: (state: IState) =>
      R.assoc('auth', { fetchStatus: 'pending' }, state),
    error: (state: IState) =>
      R.assoc(
        'auth',
        { fetchStatus: 'error', data: 'Could not get user data.' },
        state
      ),
    done: (state: IState, res: any) =>
      R.assoc('auth', { fetchStatus: 'done', data: res.data }, state)
  }
});
