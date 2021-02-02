import React, { useEffect, useState } from 'react';
import api from '../../api';
import { numberFormat } from '../../helpers';
import { IBalanceSheet, IIncomeStatement } from '../../interfaces';

import { Container, Balance, IncomeStatement } from './styles';

const BalanceSheet: React.FC = () => {
  const [balanceSheet, setBalanceSheet] = useState<IBalanceSheet>({
    assets: {
      current: {},
      longTerm: {},
      property: {},
    },
    liabilities: {
      current: {},
      longTerm: {},
    },
    equity: {},
    amounts: {
      assets: 0,
      currentAssets: 0,
      longTermAssets: 0,
      property: 0,
      currentLiabilities: 0,
      longTermLiabilities: 0,
      equity: 0,
      liabilities: 0,
    },
  });

  const [incomeStatement, setIncomeStatement] = useState<IIncomeStatement>({
    revenues: {},
    expenses: {},
    amounts: {
      revenues: 0,
      expenses: 0,
      incomeBeforeTaxes: 0,
    },
  });

  useEffect(() => {
    api.balanceSheet().then((response) => {
      if (response.success) {
        setBalanceSheet(response.balance);
        setIncomeStatement(response.incomeStatement);
      }
    });
  }, []);

  return (
    <Container className="container">
      <div className="title">
        <h1>Balanço Patrimonial</h1>

        {/* <div className="tools">
          <button type="button" onClick={() => setAddModal(true)}>
            <PlusSvg />
          </button>
        </div> */}
      </div>

      <Balance>
        <div>
          <div>
            <h2>Ativo</h2>

            <ul>
              <li>
                <strong>Circulante</strong>
                <span>{numberFormat(balanceSheet.amounts.currentAssets)}</span>
              </li>
              {balanceSheet.assets.current &&
                Object.keys(balanceSheet.assets.current).map((key, index) => (
                  <li key={index}>
                    <span>{key}</span>
                    <span>
                      {numberFormat(balanceSheet.assets.current[key])}
                    </span>
                  </li>
                ))}
            </ul>

            <ul>
              <li>
                <strong>Realizável a longo prazo</strong>
                <span>{numberFormat(balanceSheet.amounts.longTermAssets)}</span>
              </li>
              {balanceSheet.assets.longTerm &&
                Object.keys(balanceSheet.assets.longTerm).map((key, index) => (
                  <li key={index}>
                    <span>{key}</span>
                    <span>
                      {numberFormat(balanceSheet.assets.longTerm[key])}
                    </span>
                  </li>
                ))}
            </ul>

            <ul>
              <li>
                <strong>Permanente</strong>
                <span>{numberFormat(balanceSheet.amounts.property)}</span>
              </li>
              {balanceSheet.assets.property &&
                Object.keys(balanceSheet.assets.property).map((key, index) => (
                  <li key={index}>
                    <span>{key}</span>
                    <span>
                      {numberFormat(balanceSheet.assets.property[key])}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="amount">
            <ul>
              <li>
                <strong>Total</strong>
                <span>{numberFormat(balanceSheet.amounts.assets)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div>
            <h2>Passivo</h2>

            <ul>
              <li>
                <strong>Circulante</strong>
                <span>
                  {numberFormat(balanceSheet.amounts.currentLiabilities)}
                </span>
              </li>
              {balanceSheet.liabilities.current &&
                Object.keys(balanceSheet.liabilities.current).map(
                  (key, index) => (
                    <li key={index}>
                      <span>{key}</span>
                      <span>
                        {numberFormat(balanceSheet.liabilities.current[key])}
                      </span>
                    </li>
                  )
                )}
            </ul>

            <ul>
              <li>
                <strong>Exigível a longo prazo</strong>
                <span>
                  {numberFormat(balanceSheet.amounts.longTermLiabilities)}
                </span>
              </li>
              {balanceSheet.liabilities.longTerm &&
                Object.keys(balanceSheet.liabilities.longTerm).map(
                  (key, index) => (
                    <li key={index}>
                      <span>{key}</span>
                      <span>
                        {numberFormat(balanceSheet.liabilities.longTerm[key])}
                      </span>
                    </li>
                  )
                )}
            </ul>

            <ul>
              <li>
                <strong>Patrimônio Líquido</strong>
                <span>{numberFormat(balanceSheet.amounts.equity)}</span>
              </li>
              {balanceSheet.equity &&
                Object.keys(balanceSheet.equity).map((key, index) => (
                  <li key={index}>
                    <span>{key}</span>
                    <span>{numberFormat(balanceSheet.equity[key])}</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="amount">
            <ul>
              <li>
                <strong>Total</strong>
                <span>{numberFormat(balanceSheet.amounts.liabilities)}</span>
              </li>
            </ul>
          </div>
        </div>
      </Balance>

      <IncomeStatement></IncomeStatement>
    </Container>
  );
};

export default BalanceSheet;
