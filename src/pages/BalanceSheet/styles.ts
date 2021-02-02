import styled from 'styled-components';

export const Container = styled.div``;

export const Balance = styled.section`
  display: flex;
  flex-wrap: wrap;

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

export const IncomeStatement = styled.section``;
