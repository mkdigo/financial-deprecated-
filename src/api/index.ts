import axios from 'axios';
import { getToken, removeToken, setToken } from '../helpers';

const apiURL: string = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : '';

axios.defaults.baseURL = apiURL;
axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

export default axios;

export interface IResponse<T> {
  success: boolean;
  message?: string;
  access_token?: string;
  data?: T;
}

export const setHeaders = (params: any = {}) => {
  return {
    headers: {
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

export const checkTokenExpired = (error: any): void => {
  if (error.response.status === 401) {
    if (error.response.data.access_token) {
      setToken(error.response.data.access_token);
    } else {
      removeToken();
    }
    window.location.reload();
  }
};

export const catchReturn = (
  error: any
): { success: false; message: string } => {
  checkTokenExpired(error);
  if (error.response) {
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
