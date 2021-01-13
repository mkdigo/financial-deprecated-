import styled from 'styled-components';

export const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);

  background: var(--color-dark-blue);
  color: var(--color-offwhite);
  z-index: 1;

  h2 {
    padding: 1rem;

    svg {
      height: 40px;
      margin-right: 0.5rem;
    }
  }

  svg.menu-icon {
    display: none;
    position: absolute;
    height: 2rem;
    top: 1.5rem;
    right: 1rem;

    &:active,
    &:focus {
      color: var(--color-green);
    }
  }

  ul {
    flex-direction: column;

    li {
      padding: 1rem;
      border-bottom: solid 1px var(--color-gray);

      &:first-child {
        border-top: solid 1px var(--color-gray);
      }

      &.current-page {
        color: var(--color-green);
      }
    }
  }

  @media (max-width: 900px) {
    bottom: unset;
    width: 100%;

    svg.menu-icon {
      display: block;
    }

    ul {
      position: absolute;
      right: -100%;
      width: 100%;
      background: var(--color-dark-blue);
      z-index: -1;
      transition: 0.3s;

      li {
        padding: 0.8rem 1rem;
      }

      &.menu-actived {
        right: 0;
      }
    }
  }
`;
