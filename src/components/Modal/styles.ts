import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-modal-bg);
  z-index: 2;

  &.actived {
    display: flex;
  }

  div {
    background: var(--color-offwhite);
    border-radius: 5px;
    width: 100%;
    max-width: 500px;

    h2 {
      text-align: center;
      color: var(--color-green);
      padding: 1rem;
      border-bottom: solid 1px var(--color-gray);
      margin-bottom: 0.5rem;
    }

    ul {
      flex-direction: column;

      li {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;

        &:last-child {
          justify-content: flex-end;

          button + button {
            margin-left: 1rem;
          }
        }

        &.center {
          justify-content: center;
        }

        label {
          display: inline-block;
          width: 100px;
          font-weight: bold;
        }

        input,
        select,
        textarea {
          width: calc(100% - 100px);
        }

        textarea {
          height: 80px;
        }
      }
    }
  }
`;
