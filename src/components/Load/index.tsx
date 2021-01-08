import React from 'react';

import { Container, Ball } from './styles';

const balls: number[] = [];

for (let i = 1; i <= 20; i++) {
  balls.push(i);
}

const Load: React.FC = () => {
  return (
    <Container>
      <div className="loader">
        {balls.map((ball) => (
          <Ball index={ball} key={ball} />
        ))}
      </div>
    </Container>
  );
};

export default Load;
