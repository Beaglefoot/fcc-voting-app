import { ActionCreator } from 'redux';
import { IState } from 'src/state/state';

export interface ICleanVote {
  type: 'CLEAN_VOTE';
  payload: (arg: IState) => IState;
}

const cleanVote: ActionCreator<ICleanVote> = () => ({
  type: 'CLEAN_VOTE',
  payload: state => ({
    ...state,
    vote: {
      fetchStatus: 'done',
      data: null,
      error: null
    }
  })
});

export default cleanVote;
