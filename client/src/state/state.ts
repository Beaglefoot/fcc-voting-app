type fetchStatus = 'done' | 'pending' | 'error';

export interface IAuth {
  fetchStatus: fetchStatus;
  data: any;
}

export interface IPoll {
  _id: string;
  title: string;
  votesCount: number;
}

export interface IPolls {
  fetchStatus: fetchStatus;
  data: IPoll[];
}

export interface IState {
  auth: IAuth;
  polls: IPolls;
}

export const initialState: IState = {
  auth: {
    fetchStatus: 'done',
    data: null
  },

  polls: {
    fetchStatus: 'done',
    data: []
  }
};
