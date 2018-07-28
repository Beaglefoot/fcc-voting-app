export interface INetworkRequest<T> {
  fetchStatus: 'done' | 'pending' | 'error';
  data?: T;
  error: null | Error;
}

export interface IUser {
  ip: string;
  _id?: string;
  githubID?: string;
  polls?: {
    [prop: string]: string;
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
  voters?: Array<{
    ip: string;
    user: string;
  }>;
}

export type TAuth = INetworkRequest<IUser>;
export type TPolls = INetworkRequest<IPoll[]>;
export type TSelectedPoll = INetworkRequest<IPoll | null>;
export type TVote = INetworkRequest<never>;

export interface IState {
  auth: TAuth;
  polls: TPolls;
  selectedPoll: TSelectedPoll;
  vote: TVote;
  pollDeletion: {
    [pollID: string]: INetworkRequest<never>;
  };
}

export const initialState: IState = {
  auth: {
    fetchStatus: 'done',
    data: {
      ip: ''
    },
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
  },

  vote: {
    fetchStatus: 'done',
    error: null
  },

  pollDeletion: {}
};
