import axios, { catchReturn, IResponse } from './';

export interface IGroup {
  id: number;
  name: string;
}

export default class GroupApi {
  public static async get(): Promise<
    IResponse<{
      data: IGroup[];
    }>
  > {
    try {
      const url = `/groups`;
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
