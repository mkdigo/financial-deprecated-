import { RouteProps } from 'react-router-dom';

export interface IPrivateRoute extends RouteProps {
  component: any;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IFetch {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  body?: object | null;
  token?: string | null;
}

export interface IResponseToken {
  success: boolean;
  message?: string;
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  data?: object | [];
}

export interface IResponse {
  success: boolean;
  data?: object;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  is_admin: boolean;
}

export interface IAccount {
  id: number;
  name: string;
  group: string;
  subgroup: string;
}

export interface IAccountRequest {
  name: string;
  group_id: number | '';
  subgroup_id: number | '';
}

export interface IGroup {
  id: number;
  name: string;
}

export interface ISubroup {
  id: number;
  name: string;
  group_id: number;
}

export interface IEntryRequest {
  date: string;
  debit_id: string;
  credit_id: string;
  value: string;
  note: string;
}

export interface IEntry {
  id: number;
  date: string;
  debit_id: number;
  debit_name: string;
  credit_id: number;
  credit_name: string;
  value: number;
  note: string;
}
