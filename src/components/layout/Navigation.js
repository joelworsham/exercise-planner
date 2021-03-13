import {
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth';

function Navigation() {
  const auth = useAuth();

  return (
    <Navbar expand="md">
      <Navbar.Brand href="/">Exercise Planner</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav"/>
      <Navbar.Collapse id="navbar-nav">
        <Nav>
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
          {auth.user && (
            <NavDropdown
              id="navbar-nav-user"
              title={auth.user.fullName}
            >
              <NavDropdown.Item
                as={NavLink}
                to="/logout"
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
