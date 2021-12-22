import axios, { catchReturn, IResponse, setHeaders } from './';

export interface IBalanceSheet {
  assets: {
    current: any;
    longTerm: any;
    property: any;
    otherAssets: any;
  };
  liabilities: {
    current: any;
    longTerm: any;
    otherLiabilities: any;
  };
  equity: any;
  amounts: {
    assets: number;
    currentAssets: number;
    longTermAssets: number;
    property: number;
    otherAssets: number;
    currentLiabilities: number;
    longTermLiabilities: number;
    otherLiabilities: number;
    equity: number;
    liabilities: number;
  };
}

export interface IIncomeStatement {
  revenues: any;
  expenses: any;
  taxes: any;
  amounts: {
    revenues: number;
    expenses: number;
    taxes: number;
    incomeBeforeTaxes: number;
    incomeAfterTaxes: number;
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
      // const url = `/balance?year=${year}&month=${month}`;
      // const response = await axios.get(url);
      const response = await axios.get(`/balance`, setHeaders({ year, month }));

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
