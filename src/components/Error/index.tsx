import React, { Dispatch } from 'react';
import XSquareSvg from '../../svg/XSquareSvg';

import { Container } from './styles';

const Error: React.FC<{ message: string; setError: Dispatch<boolean> }> = ({
  message,
  setError,
}) => {
  const handleClose = (): void => {
    setError(false);
  };

  return (
    <Container>
      <div>
        <h2>Error</h2>

        <p>{message}</p>

        <button type="button" onClick={handleClose}>
          <XSquareSvg />
        </button>
      </div>
    </Container>
  );
};

export default Error;
