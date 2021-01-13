import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;

  display: flex;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  section.left {
    flex-grow: 1;
    background: var(--color-dark-blue);
    color: var(--color-offwhite);
    padding: 2rem;

    header {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 2rem;

      svg {
        height: 40px;
        margin-right: 1rem;
      }
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    ul {
      flex-direction: column;
      font-size: 1.1rem;
      margin-bottom: 2rem;

      li + li {
        margin-top: 0.5rem;
      }
    }

    p {
      font-size: 1.1rem;

      a {
        color: var(--color-green);

        &:hover,
        &:focus {
          filter: brightness(1.2);
        }
      }
    }
  }

  section.right {
    align-items: center;
    width: 35%;
    min-width: 360px;
    height: 100vh;
    padding: 5rem 1rem;

    div {
      border: solid 1px var(--color-gray);
      padding: 1rem;
      border-radius: 5px;

      h2 {
        color: var(--color-green);
        text-align: center;
        font-size: 2rem;
        padding-bottom: 0.7rem;
        margin-bottom: 0.5rem;
        border-bottom: solid 1px var(--color-gray);
      }

      ul {
        flex-direction: column;

        li {
          padding: 0.5rem 0;

          label {
            display: block;
            width: 80px;
            padding: 0.1rem 0.5rem;
          }

          input,
          button {
            width: 300px;
          }

          button {
            margin-top: 1rem;
          }

          small {
            display: block;
            width: 100%;
            text-align: right;
            padding: 0 0.5rem;
            color: var(--color-danger);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    section.left,
    section.right {
      width: 100%;
      height: unset;
    }
  }
`;
