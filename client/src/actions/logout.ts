import axios from 'axios';
import * as R from 'ramda';
import { IPayloadAsAFunction, ThunkActionFunctionCreator } from './actions';

export const logout: ThunkActionFunctionCreator = () => async dispatch => {
  const fetchStart: IPayloadAsAFunction = {
    type: 'LOGOUT_START',
    payload: state => R.assoc('auth', { fetchStatus: 'pending' }, state)
  };

  const fetchError: IPayloadAsAFunction = {
    type: 'LOGOUT_ERROR',
    payload: state =>
      R.assoc(
        'auth',
        { fetchStatus: 'error', data: 'Failed to logout.' },
        state
      )
  };

  const fetchSuccess: IPayloadAsAFunction = {
    type: 'LOGOUT_DONE',
    payload: state =>
      R.assoc('auth', { fetchStatus: 'done', data: null }, state)
  };

  dispatch(fetchStart);

  try {
    await axios.get('/api/logout');
  } catch (err) {
    dispatch(fetchError);
    return;
  }

  dispatch(fetchSuccess);
};
