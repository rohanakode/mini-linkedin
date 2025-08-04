import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navbar as BsNavbar, Nav, Button, Container } from "react-bootstrap";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          Mini LinkedIn
        </BsNavbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to={`/profile/${user._id}`}>
                Profile
              </Nav.Link>
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="ms-2"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
