import React from 'react';

import { Container } from './styles';

const Entries: React.FC = () => {
  return (
    <Container className="container">
      <h1>Lançamentos</h1>

      <section className="filters">Filters</section>

      <section className="data">Data</section>
    </Container>
  );
};

export default Entries;
