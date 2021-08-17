import axios, { catchReturn, IResponse } from './';

export interface ISubgroup {
  id: number;
  name: string;
  group_id: number;
}

export default class SubgroupApi {
  public static async get(): Promise<
    IResponse<{
      data: ISubgroup[];
    }>
  > {
    try {
      const url = `/subgroups`;
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
}
