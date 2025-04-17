import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PersonCircle, BellFill, BoxArrowRight } from 'react-bootstrap-icons';
import { authService } from '../../services/authServices';

const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [notificationsCount] = React.useState(3);

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // ✅ Navigate to actual login route
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          SmartQueue
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/about">À propos</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            {user ? (
              <>
                <Nav.Link className="position-relative me-2">
                  <BellFill size={20} />
                  {notificationsCount > 0 && (
                    <Badge 
                      pill 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {notificationsCount}
                    </Badge>
                  )}
                </Nav.Link>
                
                <NavDropdown
                  title={
                    <>
                      <PersonCircle className="me-1" />
                      {user.fullName}
                    </>
                  }
                  align="end"
                >
                  <NavDropdown.Item href="/profile">
                    Mon profil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <BoxArrowRight className="me-1" />
                    Déconnexion
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-light" 
                  className="me-2" 
                  href="/import { authService } from '../../services/authServices';
"
                >
                  Connexion
                </Button>
                <Button variant="light" href="/signup">
                  Inscription
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

