import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  GeoAltFill,
  TelephoneFill,
  EnvelopeFill 
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-primary mb-3">SmartQueue</h5>
            <p>
              Solution innovante de gestion de files d'attente intelligente 
              pour les entreprises et institutions publiques.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><Facebook size={20} /></a>
              <a href="#" className="text-white"><Twitter size={20} /></a>
              <a href="#" className="text-white"><Instagram size={20} /></a>
              <a href="#" className="text-white"><Linkedin size={20} /></a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="text-primary mb-3">Liens rapides</h5>
            <ListGroup variant="flush">
              <ListGroup.Item action as={Link} to="/" className="bg-dark text-white border-0 px-0">
                Accueil
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/about" className="bg-dark text-white border-0 px-0">
                À propos
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/contact" className="bg-dark text-white border-0 px-0">
                Contact
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/profile" className="bg-dark text-white border-0 px-0">
                Mon compte
              </ListGroup.Item>
            </ListGroup>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="text-primary mb-3">Secteurs</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-white border-0 px-0">
                Santé
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0 px-0">
                Banques
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0 px-0">
                Administration
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0 px-0">
                Commerce
              </ListGroup.Item>
            </ListGroup>
          </Col>
          
          <Col md={3}>
            <h5 className="text-primary mb-3">Contactez-nous</h5>
            <div className="d-flex align-items-center mb-2">
              <GeoAltFill className="me-2 text-primary" />
              <span>Tunis, Tunisia</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <TelephoneFill className="me-2 text-primary" />
              <span>+216 12 345 678</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <EnvelopeFill className="me-2 text-primary" />
              <span>contact@smartqueue.tn</span>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-4 pt-3 border-top border-secondary">
          <Col className="text-center text-muted">
            <small>
              &copy; {currentYear} SmartQueue. Tous droits réservés.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
