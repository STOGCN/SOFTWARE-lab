import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Banking System</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/accounts">
              <Nav.Link>Accounts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transfer">
              <Nav.Link>Transfer Money</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transactions">
              <Nav.Link>Transactions</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/notifications">
              <Nav.Link>Notifications</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;