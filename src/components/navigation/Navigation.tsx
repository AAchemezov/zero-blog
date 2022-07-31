import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, LinkProps, useMatch } from 'react-router-dom';

function NavLink({ to, ...rest }: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  const match = Boolean(useMatch({ path: to.toString(), end: false }));
  return (
    <Nav.Link active={match} as={Link} to={to} {...rest} />
  );
}

function Navigation() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top" className="rounded-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/posts">
          <div className="d-flex align-items-center">
            <i className="material-icons md-24">egg</i>
            zero-blog
          </div>
        </Navbar.Brand>
        <Nav className="me-auto d-flex flex-row flex-nowrap">
          <NavLink className="p-2" to="/posts">Посты</NavLink>
          <NavLink className="p-2" to="/todos">Задачи</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
