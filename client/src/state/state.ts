export interface IAuth {
  fetchStatus: 'done' | 'pending' | 'error';
  data: any;
}

export interface IState {
  auth: IAuth;
}

export const initialState: IState = {
  auth: {
    fetchStatus: 'done',
    data: null
  }
};
