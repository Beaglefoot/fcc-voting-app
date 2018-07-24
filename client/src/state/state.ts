export interface INetworkRequest<T> {
  fetchStatus: 'done' | 'pending' | 'error';
  data: T;
  error: null | Error;
}

export interface IUser {
  _id: string;
  ip: string;
  user?: {
    githubID?: string;
    polls: string[];
  };
}

export interface IOption {
  name: string;
  votes: number;
}

export interface IPoll {
  _id: string;
  title: string;
  votesCount?: number;
  options?: IOption[];
  author?: IUser;
  voters?: IUser[];
}

export type TAuth = INetworkRequest<IUser | ''>;
export type TPolls = INetworkRequest<IPoll[]>;
export type TSelectedPoll = INetworkRequest<IPoll | null>;

export interface IState {
  auth: TAuth;
  polls: TPolls;
  selectedPoll: TSelectedPoll;
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
  },

  selectedPoll: {
    fetchStatus: 'done',
    data: null,
    error: null
  }
};
