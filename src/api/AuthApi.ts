import axios, { catchReturn } from './index';
import { removeToken, setToken } from '../helpers';

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  is_admin: boolean;
  active: boolean;
}

interface IResponse<T> {
  success: boolean;
  message?: string;
  access_token?: string;
  data?: T;
}

export default class UserApi {
  public static async login(data: ILogin): Promise<IResponse<IUser>> {
    try {
      const response = await axios.post('/login', data);

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      axios.defaults.headers.common = {
        Authorization: `Bearer ${response.data.access_token}`,
      };
      setToken(response.data.access_token);

      return {
        success: true,
        data: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }

  public static async logout(): Promise<IResponse<null>> {
    try {
      const response = await axios.get('/logout');

      if (response.data.success) removeToken();

      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      return catchReturn(error);
    }
  }

  public static async me(): Promise<IResponse<IUser>> {
    try {
      const response = await axios.get('/me');

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data.user,
      };
    } catch (error) {
      return catchReturn(error);
    }
  }
}
