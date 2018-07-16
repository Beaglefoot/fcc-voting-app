import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IState } from 'src/state/state';

export interface IPayloadAsAFunction {
  type: string;
  payload: (state: {}) => {};
}

export type ThunkActionFunctionCreator = ActionCreator<
  ThunkAction<void | Promise<void>, IState, null, IPayloadAsAFunction>
>;
