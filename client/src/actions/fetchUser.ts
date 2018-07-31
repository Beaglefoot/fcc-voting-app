import * as R from 'ramda';
import { AxiosResponse } from 'axios';
import getNetworkRequestActionCreator from 'src/helpers/getNetworkRequestActionCreator';
import { IState } from 'src/state/state';

export const fetchUser = getNetworkRequestActionCreator({
  url: '/api/current_user',
  namePrefix: 'FETCH_USER',
  payload: {
    start: (state: IState) =>
      R.assocPath(['auth', 'fetchStatus'], 'pending', state),

    error: (state: IState) =>
      R.over(
        R.lensProp('auth'),
        slice => ({
          ...slice,
          fetchStatus: 'error',
          error: 'Could not get user data.'
        }),
        state
      ),

    done: (state: IState, res: AxiosResponse) =>
      R.over(
        R.lensProp('auth'),
        slice => ({
          ...slice,
          fetchStatus: 'done',
          data: R.over(
            R.lensProp('polls'),
            polls =>
              polls.reduce(
                (obj: { [prop: string]: string }, id: string) => ({
                  ...obj,
                  [id]: id
                }),
                {}
              ),
            res.data
          )
        }),
        state
      )
  }
});
