import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ThunkActionFunctionCreator } from '../actions/actions';

interface INetworkRequestActionCreatorParams {
  url?: string;
  config?: AxiosRequestConfig;
  namePrefix: string;
  payload: {
    start: any;
    error: any;
    done: any;
  };
}

export type TGetNetworkRequestActionCreator = (
  arg: INetworkRequestActionCreatorParams
) => ThunkActionFunctionCreator;

const getNetworkRequestActionCreator: TGetNetworkRequestActionCreator = ({
  url = '',
  config = { method: 'GET' },
  namePrefix,
  payload: { start, error, done }
}) => (
  redefinedUrl?: string,
  data?: { [prop: string]: any },
  callback?: (arg: AxiosResponse) => void
) => async dispatch => {
  let response: AxiosResponse;

  const fetchStart = {
    type: `${namePrefix}_START`,
    payload: start
  };

  const fetchError = {
    type: `${namePrefix}_ERROR`,
    payload: error
  };

  const fetchSuccess = {
    type: `${namePrefix}_DONE`,
    payload:
      typeof done === 'function'
        ? (...args: any[]) => done(...args, response)
        : done
  };

  dispatch(fetchStart);

  try {
    response = await axios({ ...config, url: redefinedUrl || url, data });
  } catch (err) {
    dispatch(fetchError);
    return;
  }

  dispatch(fetchSuccess);

  if (callback) callback(response);
};

export default getNetworkRequestActionCreator;
