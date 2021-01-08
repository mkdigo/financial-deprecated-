import styled, { keyframes } from 'styled-components';

const animate = keyframes`
  0% {
    transform: scale(1);
  }

  80%, 100% {
    transform: scale(0);
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;

  div.loader {
    position: relative;
    width: 60px;
    height: 60px;
  }
`;

interface IProps {
  index: number;
}

export const Ball = styled.span<IProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:nth-child(${({ index }) => index}) {
    transform: ${({ index }) => `rotate(calc(18deg * ${index}))`};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;

    background: var(--color-green);
    border-radius: 50%;
    box-shadow: 0 0 5px var(--color-green), 0 0 10px var(--color-green);

    transform: scale(0);
    animation: ${animate} 2s linear infinite;
    animation-delay: ${({ index }) => `calc(0.1s * ${index})`};
  }
`;
