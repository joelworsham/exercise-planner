import {
  Nav,
  Navbar,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar expand="md">
      <Navbar.Brand href="/">Exercise Planner</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav"/>
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={NavLink}
            to="/"
            exact
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/admin"
          >
            Admin
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
