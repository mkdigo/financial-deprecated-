import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthApi from '../../api/AuthApi';
import { AppContext } from '../../contexts/AppProvider';
import { Container } from './styles';

const Logout: React.FC = () => {
  const history = useHistory();
  const { handleError } = useContext(AppContext);

  useEffect(() => {
    AuthApi.logout().then((response) => {
      if (response.success) history.push('/');
      else handleError('Algo de errado aconteceu, tente novamente.');
    });
  }, [history, handleError]);

  return (
    <Container>
      <h1>Disconnecting...</h1>
    </Container>
  );
};

export default Logout;
