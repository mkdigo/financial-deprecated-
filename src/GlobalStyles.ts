import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-offwhite: #f5f5f5;
    --color-dark: #333333;
    --color-gray: #CCC;
    --color-dark-gray: #666;
    --color-green: #41b883;
    --color-dark-blue: #35495e;
    --color-danger: #cc3333;
    --color-primary: #4A97D0;
    --color-modal-bg: rgba(0, 0, 0, 0.5);

    --sidebar-width: 300px;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    outline: none;
  }

  body {
    font-size: 16px;
    background: var(--color-offwhite);
    color: var(--color-dark);
  }

  input, select, textarea {
    font-size: 1rem;
    border: solid 1px var(--color-gray);
    border-radius: 5px;
    padding: 0.5rem;
    height: 38px;

    &:hover, &:focus {
      border: solid 1px var(--color-green);
      outline: none;
    }
  }

  button {
    font-size: 1rem;
    border: solid 1px var(--color-gray);
    border-radius: 5px;
    padding: 0.6rem;
    background: var(--color-gray);
    cursor: pointer;

    &:hover {
      filter: brightness(1.08);
      outline: none;
    }
    
    &:focus {
      border: solid 1px var(--color-dark-gray);
    }

    &:active {
      filter: brightness(0.8);
    }
  }

  .btn-primary {
    background: var(--color-primary);
    color: var(--color-offwhite);
  }

  .btn-danger {
    background: var(--color-danger);
    color: var(--color-offwhite);
  }

  a {
    color: unset;
    text-decoration: none;

    &:hover, &:focus {
      color: var(--color-green);
    } 
  }

  ul {
    list-style: none;
    display: flex;
  }

  .container {
    position: absolute;
    top: 0;
    right: 0;
    left: var(--sidebar-width);
    padding: 1rem;

    div.title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--color-green);
      margin-bottom: 1rem;
      border-bottom: solid 1px var(--color-gray);

      div.tools {
        display: flex;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          padding: 0;

          & + button {
            margin-left: 1rem;
          }

          svg {
            height: 100%;
          }
        }
      }
    }

    @media (max-width: 900px) {
      left: 0;
      top: 80px;
    }
  }

  .modal {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-modal-bg);
    z-index: 1;

    .modal-content {
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
          padding: 0.5rem 1rem;

          &:last-child {
            text-align: right;

            button + button {
              margin-left: 1rem;
            }
          }

          label {
            display: inline-block;
            width: 100px;
            font-weight: bold;
          }

          input, select {
            width: calc(100% - 100px);
          }


        }
      }
    }
  }
`;
