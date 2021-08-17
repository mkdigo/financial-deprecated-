import axios, { catchReturn, IResponse } from './';

export interface IEntryRequest {
  id?: number;
  date: string;
  debit_id: number;
  credit_id: number;
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

export default class EntryApi {
  public static async get(search: string = ''): Promise<IResponse<IEntry[]>> {
    try {
      const response = await axios.get(`/entries?search=${search}`);

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

  public static async store(body: IEntryRequest): Promise<IResponse<IEntry>> {
    try {
      const response = await axios.post('/entries', body);

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
    body: IEntryRequest
  ): Promise<IResponse<IEntry>> {
    try {
      const response = await axios.put(`/entries/${id}`, body);

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
      const response = await axios.delete(`/entries/${id}`);

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
