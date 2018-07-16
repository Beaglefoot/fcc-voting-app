import axios, { AxiosResponse } from 'axios';
import * as R from 'ramda';
import { IPayloadAsAFunction, ThunkActionFunctionCreator } from './actions';

export const fetchUser: ThunkActionFunctionCreator = () => async dispatch => {
  let res: AxiosResponse;

  const fetchStart: IPayloadAsAFunction = {
    type: 'FETCH_USER_START',
    payload: state => R.assoc('auth', { fetchStatus: 'pending' }, state)
  };

  const fetchError: IPayloadAsAFunction = {
    type: 'FETCH_USER_ERROR',
    payload: state =>
      R.assoc(
        'auth',
        { fetchStatus: 'error', data: 'Could not get user data.' },
        state
      )
  };

  const fetchSuccess: IPayloadAsAFunction = {
    type: 'FETCH_USER_DONE',
    payload: state =>
      R.assoc('auth', { fetchStatus: 'done', data: res.data }, state)
  };

  dispatch(fetchStart);

  try {
    res = await axios.get('/api/current_user');
  } catch (err) {
    dispatch(fetchError);
    return;
  }

  dispatch(fetchSuccess);
};
