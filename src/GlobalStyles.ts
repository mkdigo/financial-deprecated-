import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;

    &:focus {
      outline: dashed 1px #CCC;
    }
  }

  :root {
    --color-offwhite: #f5f5f5;
    --color-dark: #333333;
    --color-green: #41b883;
    --color-dark-blue: #35495e;
  }

  body {
    font-size: 16px;
    background: var(--color-offwhite);
  }

  input, select, textarea {
    font-size: 16px;
  }

  a {
    color: unset;
    text-decoration: none;

    &:hover, &:focus {
      color: var(--color-green);
    } 
  }
`;
