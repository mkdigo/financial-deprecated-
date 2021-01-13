import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoSvg from '../../svg/LogoSvg';
import MenuSvg from '../../svg/MenuSvg';

import { Container } from './styles';

const SideBar: React.FC = () => {
  const location = useLocation();
  const [menuActived, setMenuActived] = useState<boolean>(false);

  const handleMenuActive = (): void => {
    setMenuActived(!menuActived);
  };

  return (
    <Container>
      <h2>
        <LogoSvg />
        <span>Financial Control</span>
      </h2>

      <MenuSvg className="menu-icon" onClick={handleMenuActive} />

      <ul className={menuActived ? 'menu-actived' : ''}>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Balanço Patrimonial
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            DRE
          </li>
        </Link>
        <Link to="/accounts">
          <li
            className={location.pathname === '/accounts' ? 'current-page' : ''}
          >
            Contas
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Bancos
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Contas a Pagar
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Contas a Receber
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Despesas
          </li>
        </Link>
        <Link to="/entries">
          <li
            className={location.pathname === '/entries' ? 'current-page' : ''}
          >
            Lançamentos
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Produtos
          </li>
        </Link>
        <Link to="/entries">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Receitas
          </li>
        </Link>
        <Link to="/">
          <li className={location.pathname === '/' ? 'current-page' : ''}>
            Sair
          </li>
        </Link>
      </ul>
    </Container>
  );
};

export default SideBar;
