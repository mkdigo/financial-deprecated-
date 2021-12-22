import axios, { catchReturn, IResponse, setHeaders } from './';
import { IGroup } from './GroupApi';
import { ISubgroup } from './SubgroupApi';

export interface IAccount {
  id: number;
  group_id: number;
  subgroup_id: number;
  name: string;
  description?: string | null;
  group: IGroup;
  subgroup: ISubgroup;
}

export interface IAccountBody {
  id?: number;
  group_id: number | '';
  subgroup_id: number | '';
  name: string;
  description?: string | null;
}

export interface IAccountSearchParams {
  group_id: string;
  subgroup_id: string;
  search: string;
}

export default class AccountApi {
  public static async get(
    params?: IAccountSearchParams
  ): Promise<IResponse<IAccount[]>> {
    try {
      const url = `/accounts`;
      const response = await axios.get(url, setHeaders(params));

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data.accounts,
      };
    } catch (error) {
      return catchReturn(error);
    }
  }

  public static async store(body: IAccountBody): Promise<IResponse<IAccount>> {
    try {
      const response = await axios.post('/accounts', body);

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data.account,
      };
    } catch (error) {
      return catchReturn(error);
    }
  }

  public static async update(
    id: number,
    body: IAccountBody
  ): Promise<IResponse<IAccount>> {
    try {
      const response = await axios.put(`/accounts/${id}`, body);

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data.account,
      };
    } catch (error) {
      return catchReturn(error);
    }
  }

  public static async destroy(id: number): Promise<IResponse<undefined>> {
    try {
      const response = await axios.delete(`/accounts/${id}`);

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      return catchReturn(error);
    }
  }
}
