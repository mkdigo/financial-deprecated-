import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ILogin } from '../../interfaces';
import LogoSvg from '../../svg/LogoSvg';
import api from '../../api';

import { Container } from './styles';

const Home: React.FC = () => {
  const [data, setData] = useState<ILogin>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<boolean>(false);

  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    api.login(data).then((response) => {
      if (response) {
        setError(false);
        history.push('/entries');
      } else setError(true);
    });
  };

  return (
    <Container>
      <section className="left">
        <header>
          <LogoSvg />
          <span>Financial Control</span>
        </header>

        <h1>Seu app de controle financeiro.</h1>

        <h2>Tenha toda movimentação financeira da sua empresa em suas mãos.</h2>

        <ul>
          <li>- Balanço Patrimonial</li>
          <li>- DRE</li>
          <li>- Controle de Estoque</li>
          <li>- Contas a pagar e receber</li>
          <li>- E muito mais</li>
        </ul>

        <p>
          Faça o login ou <Link to="/signup">clique aqui</Link> para se
          cadastrar.
        </p>
      </section>
      <section className="right">
        <div>
          <h2>Login</h2>

          <form action="" onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={data.username}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleInputChange}
                />

                {error && (
                  <small className="error">Usuário ou senha incorreta.</small>
                )}
              </li>
              <li>
                <button type="submit">Entrar</button>
              </li>
            </ul>
          </form>
        </div>
      </section>
    </Container>
  );
};

export default Home;
