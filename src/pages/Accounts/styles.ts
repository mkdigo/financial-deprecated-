import styled from 'styled-components';

export const Container = styled.div`
  ul.card {
    flex-direction: column;
    border: solid 1px var(--color-gray);
    border-radius: 5px;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;

    li {
      padding: 0.3rem 0;

      strong {
        display: inline-block;
        width: 120px;
      }
    }
  }
`;
