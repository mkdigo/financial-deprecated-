import styled from 'styled-components';

export const Container = styled.div``;

export const SelectDate = styled.ul`
  margin-bottom: 1rem;

  li {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;

    label {
      font-weight: bold;
      padding-left: 0.5rem;
    }

    input,
    select {
      width: 100px;
    }
  }
`;

export const Balance = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  h2 {
    padding: 0.5rem;
    background: var(--color-gray);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    border: solid 1px var(--color-gray);

    div {
      width: 100%;
      border: none;

      ul {
        display: flex;
        flex-direction: column;

        li {
          border-top: solid 1px var(--color-gray);
          display: flex;
          justify-content: space-between;
          padding: 0.5rem;

          & + li {
            padding-left: 1.5rem;
          }
        }
      }
    }
    div.amount {
      font-size: 1.2rem;
      font-weight: bold;
    }

    @media (max-width: 1025px) {
      width: 100%;
    }
  }
`;

export const IncomeStatement = styled.section`
  border: solid 1px var(--color-gray);

  ul {
    flex-direction: column;

    h2 {
      padding: 0.5rem;
      background: var(--color-gray);
    }

    li {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-top: solid 1px var(--color-gray);
    }

    li.netIncome {
      font-size: 1.2rem;
    }
  }
`;
