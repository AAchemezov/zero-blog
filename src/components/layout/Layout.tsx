import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from '../navigation/Navigation';

function Layout() {
  return (
    <Container>
      <Navigation />
      <Outlet />
    </Container>
  );
}

export default Layout;
