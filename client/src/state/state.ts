type fetchStatus = 'done' | 'pending' | 'error';

export interface IAuth {
  fetchStatus: fetchStatus;
  data: any;
  error: null | Error;
}

export interface IPoll {
  _id: string;
  title: string;
  votesCount: number;
}

export interface IPolls {
  fetchStatus: fetchStatus;
  data: IPoll[];
  error: null | Error;
}

export interface IState {
  auth: IAuth;
  polls: IPolls;
}

export const initialState: IState = {
  auth: {
    fetchStatus: 'done',
    data: null,
    error: null
  },

  polls: {
    fetchStatus: 'done',
    data: [],
    error: null
  }
};
