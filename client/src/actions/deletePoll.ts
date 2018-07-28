import * as R from 'ramda';
import axios from 'axios';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import { IState } from 'src/state/state';

export const deletePoll: ThunkActionFunctionCreator = (
  pollID: string
) => async dispatch => {
  dispatch({
    type: 'DELETE_POST_START',
    payload: (state: IState) =>
      R.assocPath(['pollDeletion', pollID, 'fetchStatus'], 'pending', state)
  });

  const url = `/api/polls/${pollID}`;

  try {
    await axios.delete(url);
  } catch (err) {
    dispatch({
      type: 'DELETE_POST_ERROR',
      payload: (state: IState) =>
        R.over(
          R.lensPath(['pollDeletion', pollID]),
          slice => ({
            ...slice,
            fetchStatus: 'error',
            error: 'Cannot delete post.'
          }),
          state
        )
    });

    return;
  }

  dispatch({
    type: 'DELETE_POST_SUCCESS',
    payload: (state: IState) =>
      R.compose(
        R.over(
          R.lensPath(['polls', 'data']),
          R.filter(({ _id }) => _id !== pollID)
        ),
        R.dissocPath(['auth', 'data', 'polls', pollID]),
        R.dissocPath(['pollDeletion', pollID])
      )(state)
  });
};
