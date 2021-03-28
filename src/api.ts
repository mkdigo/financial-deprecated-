import { getToken, removeToken, setToken } from './helpers';
import {
  IAccount,
  IAccountRequest,
  IBalanceSheet,
  IEntry,
  IEntryRequest,
  IFetch,
  IGroup,
  IIncomeStatement,
  ILogin,
  IResponse,
  // IResponseToken,
  ISubroup,
} from './interfaces';

const apiURL: string = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : '';

export interface IResponseToken1 {
  success: boolean;
  message?: string;
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  data?: object | [];
}

export interface IResponse1 {
  success: boolean;
  data?: object;
}

// interface IRes {
//   success: boolean;
//   data: object;
//   message: string;
//   access_token: string;
//   expires_in: number;
//   token_type: string;
//   errors: string;
// }

const firstRequest = async ({
  url,
  method = 'get',
  body = null,
  token = null,
}: IFetch): Promise<any> => {
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  if (token) headers.append('Authorization', 'Bearer ' + token);

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  })
    .then((res) => {
      if (!res.ok) {
        let message = '';
        if (res.status === 401) message = 'Unauthorized (401)';
        else message = `Algo de errado aconteceu, status ${res.status}`;
        throw new Error(message);
      }
      return res.json();
    })
    .catch((e) => {
      removeToken();
      return {
        success: false,
        message: e.message,
      };
    });

  return response;
};

const request = async ({
  url,
  method = 'get',
  body = null,
  token = null,
}: IFetch): Promise<any> => {
  const response = await firstRequest({ url, method, body, token });
  if (!response.success) {
    if (response.access_token) {
      setToken(response.access_token);
      const requestAgain = await firstRequest({
        url,
        method,
        body,
        token: response.access_token,
      });
      if (requestAgain.success) return requestAgain;
    }
  }
  return response;
};

const api = {
  login: async (data: ILogin): Promise<boolean> => {
    const options: IFetch = {
      url: `${apiURL}/login`,
      method: 'post',
      body: data,
    };

    const response = await request(options);
    if (response.success) setToken(response.access_token);
    return response.success;
  },
  logout: async (): Promise<boolean> => {
    const url = apiURL + '/logout';
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });
    removeToken();
    return response.success;
  },
  me: async (): Promise<IResponse> => {
    const url = apiURL + '/me';
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });
    return response;
  },
  accounts: async (
    group_id: number | '' = '',
    subgroup_id: number | '' = ''
  ): Promise<{
    success: boolean;
    data: { accounts: IAccount[]; groups: IGroup[]; subgroups: ISubroup[] };
  }> => {
    const url = `${apiURL}/accounts?group_id=${group_id}&subgroup_id=${subgroup_id}`;
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });

    return response;
  },
  accountStore: async (
    body: IAccountRequest
  ): Promise<{ success: boolean; data: IAccount; errors: string }> => {
    const url = apiURL + '/accounts';
    const response = await request({
      url,
      method: 'post',
      body: body,
      token: getToken(),
    });

    return response;
  },
  accountUpdate: async (
    id: number,
    body: IAccountRequest
  ): Promise<{ success: boolean; data: IAccount; errors: string }> => {
    const url = `${apiURL}/accounts/${id}`;
    const response = await request({
      url,
      method: 'put',
      body: body,
      token: getToken(),
    });

    return response;
  },
  accountDestroy: async (
    id: number
  ): Promise<{ success: boolean; errors: string }> => {
    const url = `${apiURL}/accounts/${id}`;
    const response = await request({
      url,
      method: 'delete',
      body: null,
      token: getToken(),
    });

    return response;
  },
  groups: async (): Promise<{ success: boolean; data: IGroup[] }> => {
    const url = apiURL + '/groups';
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });

    return response;
  },
  subgroups: async (): Promise<{ success: boolean; data: ISubroup[] }> => {
    const url = apiURL + '/subgroups';
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });

    return response;
  },
  entries: async (): Promise<{ success: boolean; data: IEntry[] }> => {
    const url = apiURL + '/entries';
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });

    return response;
  },
  entriesStore: async (
    body: IEntryRequest
  ): Promise<{ success: boolean; data: IEntry; errors: string }> => {
    const url = apiURL + '/entries';
    const response = await request({
      url,
      method: 'post',
      body,
      token: getToken(),
    });

    return response;
  },
  entriesUpdate: async (
    id: number,
    body: IEntryRequest
  ): Promise<{ success: boolean; data: IEntry; errors: string }> => {
    const url = `${apiURL}/entries/${id}`;
    const response = await request({
      url,
      method: 'put',
      body: body,
      token: getToken(),
    });

    return response;
  },
  entriesDestroy: async (
    id: number
  ): Promise<{ success: boolean; errors: string }> => {
    const url = `${apiURL}/entries/${id}`;
    const response = await request({
      url,
      method: 'delete',
      body: null,
      token: getToken(),
    });

    return response;
  },
  balanceSheet: async (
    yearMonth: string
  ): Promise<{
    success: boolean;
    balance: IBalanceSheet;
    incomeStatement: IIncomeStatement;
  }> => {
    const url = `${apiURL}/balance?yearMonth=${yearMonth}`;
    const response = await request({
      url,
      method: 'get',
      body: null,
      token: getToken(),
    });

    return response;
  },
};

export default api;
