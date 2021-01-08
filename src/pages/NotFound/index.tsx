import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundSvg from '../../svg/NotFoundSvg';

import { Container } from './styles';

const NotFound: React.FC = () => {
  return (
    <Container>
      <h1>Pagina não encontrada!</h1>
      <Link to="/">Voltar para home.</Link>
      <NotFoundSvg />
    </Container>
  );
};

export default NotFound;
