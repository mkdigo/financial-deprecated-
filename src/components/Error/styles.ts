import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background: var(--color-modal-bg);
  z-index: 2;

  div {
    position: relative;
    background: var(--color-offwhite);
    border-radius: 5px;
    width: 100%;
    max-width: 500px;

    h2 {
      color: var(--color-danger);
      text-align: center;
      border-bottom: solid 1px var(--color-danger);
      padding: 1rem;
      margin-bottom: 0.5rem;
    }

    p {
      text-align: center;
      padding: 1rem;
    }

    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 25px;
      height: 25px;
      background: transparent;
      border: none;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 2rem;
        color: var(--color-danger);

        height: 25px;
      }
    }
  }
`;
