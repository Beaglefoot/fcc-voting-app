export type changeMessage = (
  msg: string
) => {
  type: 'CHANGE_MESSAGE';
  payload: (state: {}) => {};
};

export const changeMessage: changeMessage = msg => ({
  type: 'CHANGE_MESSAGE',
  payload: state => ({ ...state, msg })
});
