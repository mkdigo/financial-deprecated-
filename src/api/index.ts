import axios from 'axios';
import { getToken, removeToken } from '../helpers';

const apiURL: string = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : '';

axios.defaults.baseURL = apiURL;
axios.defaults.headers.common = {
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
};
axios.defaults.withCredentials = true;

type TSuccess<T> = {
  success: true;
  data: T;
};

type TError = {
  success: false;
  fields?: string[];
  errors?: any;
  message?: string;
};

export type TResponse<T> = TSuccess<T> | TError;

// remove
export interface IResponse<T> {
  success: boolean;
  message?: string;
  access_token?: string;
  data?: T;
}

export const setHeaders = (params: any = {}) => {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    params,
  };
};

export const transformErrorsArrayToString = (errors: {}): string => {
  if (typeof errors === 'object') {
    let message = '';
    (Object.keys(errors) as Array<keyof typeof errors>).forEach((key) => {
      message += errors[key] + ' ';
    });
    return message;
  } else return 'Something is wrong!';
};

export const checkTokenError = (error: any): void => {
  if (error.response.status === 401) {
    removeToken();
    window.location.href = '/';
  }
};

export const catchReturn = (
  error: any
): { success: false; message: string } => {
  if (error.response) {
    checkTokenError(error);

    return {
      success: false,
      message: error.response.data.message,
    };
  }
  return {
    success: false,
    message: 'Something is wrong.',
  };
};

export default axios;
