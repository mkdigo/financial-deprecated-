import axios, { catchReturn, IResponse } from './';

export interface IBalanceSheet {
  assets: {
    current: any;
    longTerm: any;
    property: any;
  };
  liabilities: {
    current: any;
    longTerm: any;
  };
  equity: any;
  amounts: {
    assets: number;
    currentAssets: number;
    longTermAssets: number;
    property: number;
    currentLiabilities: number;
    longTermLiabilities: number;
    equity: number;
    liabilities: number;
  };
}

export interface IIncomeStatement {
  revenues: any;
  expenses: any;
  amounts: {
    revenues: number;
    expenses: number;
    incomeBeforeTaxes: number;
  };
}

export default class BalanceSheetApi {
  public static async get(
    year: string,
    month: string
  ): Promise<
    IResponse<{
      balance: IBalanceSheet;
      incomeStatement: IIncomeStatement;
    }>
  > {
    try {
      const url = `/balance?year=${year}&month=${month}`;
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
