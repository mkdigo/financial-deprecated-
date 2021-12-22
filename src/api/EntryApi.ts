import axios, { catchReturn, IResponse, setHeaders } from './';

export interface IEntryRequest {
  id?: number;
  inclusion: string;
  debit_id: number;
  credit_id: number;
  value: string;
  note: string;
}

export interface IEntry {
  id: number;
  inclusion: string;
  debit_id: number;
  debit_name: string;
  credit_id: number;
  credit_name: string;
  value: number;
  note: string;
}

export interface IEntrySearchParams {
  search: string;
}

export default class EntryApi {
  public static async get(
    params?: IEntrySearchParams
  ): Promise<IResponse<IEntry[]>> {
    try {
      const response = await axios.get(`/entries`, setHeaders(params));

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data.entries,
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
        data: response.data.entry,
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
        data: response.data.entry,
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
