import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Container, Nav } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { url } = useRouteMatch();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <Nav urlPath={url}>
          <Link to="/">Listagem</Link>
          <Link to="/import">Importar</Link>
        </Nav>
      </header>
    </Container>
  );
};

export default Header;
