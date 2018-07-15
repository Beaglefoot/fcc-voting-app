import { Reducer } from 'redux';

interface IReduction {
  [prop: string]: () => {};
}

const initialState = {
  msg: 'This goes from redux store'
};

const reducer: Reducer = (state = initialState, action) => {
  if (typeof action.payload === 'function') return action.payload(state);

  const reduction: IReduction = {
    DEFAULT: () => state
  };

  return (reduction[action.type] || reduction.DEFAULT)();
};

export default reducer;
