import { Reducer } from 'redux';
import { initialState } from 'src/state/state';

interface IReduction {
  [prop: string]: () => {};
}

const reducer: Reducer = (state = initialState, action) => {
  if (typeof action.payload === 'function') return action.payload(state);

  const reduction: IReduction = {
    DEFAULT: () => state
  };

  return (reduction[action.type] || reduction.DEFAULT)();
};

export default reducer;
