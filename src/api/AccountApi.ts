import axios, { catchReturn, IResponse } from './';
import { IGroup } from './GroupApi';
import { ISubgroup } from './SubgroupApi';

export interface IAccount {
  id: number;
  name: string;
  group_id: number;
  group: string;
  subgroup_id: number;
  subgroup: string;
}

export interface IAccountBody {
  id?: number;
  name: string;
  group_id: number | '';
  subgroup_id: number | '';
}

export interface IAccountEdit {
  id: number;
  name: string;
  group_id: number | '';
  subgroup_id: number | '';
}

export default class AccountApi {
  public static async get(
    group_id: number | '' = '',
    subgroup_id: number | '' = ''
  ): Promise<
    IResponse<{
      accounts: IAccount[];
      groups: IGroup[];
      subgroups: ISubgroup[];
    }>
  > {
    try {
      const url = `/accounts?group_id=${group_id}&subgroup_id=${subgroup_id}`;
      const response = await axios.get(url);

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data.data,
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
        data: response.data.data,
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
        data: response.data.data,
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
