import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Gear, ShieldCheck, GraphUp, People } from 'react-bootstrap-icons';

const About: React.FC = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="text-center mb-5">À Propos de SmartQueue</h1>
          
          <Card className="shadow-sm mb-5">
            <Card.Body>
              <Card.Text className="lead">
                SmartQueue révolutionne la gestion des files d'attente en Tunisie grâce à une 
                solution numérique intelligente qui optimise le flux des clients et réduit 
                les temps d'attente.
              </Card.Text>
            </Card.Body>
          </Card>

          <Row className="g-4 mb-5">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <Gear className="me-2 text-primary" size={24} />
                    Notre Mission
                  </Card.Title>
                  <Card.Text>
                    Éliminer les longues files d'attente dans les établissements publics
                    et privés en Tunisie en digitalisant le processus de gestion des files.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <ShieldCheck className="me-2 text-primary" size={24} />
                    Nos Valeurs
                  </Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Efficacité</ListGroup.Item>
                    <ListGroup.Item>Innovation</ListGroup.Item>
                    <ListGroup.Item>Accessibilité</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="text-center mb-4">Nos Avantages</h2>
          <Row className="g-4">
            <Col md={3}>
              <Card className="text-center h-100 shadow-sm">
                <Card.Body>
                  <GraphUp size={48} className="text-primary mb-3" />
                  <Card.Title>Réduction d'attente</Card.Title>
                  <Card.Text>Jusqu'à 70% de temps gagné</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100 shadow-sm">
                <Card.Body>
                  <People size={48} className="text-primary mb-3" />
                  <Card.Title>Satisfaction client</Card.Title>
                  <Card.Text>Expérience utilisateur améliorée</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100 shadow-sm">
                <Card.Body>
                  <Gear size={48} className="text-primary mb-3" />
                  <Card.Title>Solution clé en main</Card.Title>
                  <Card.Text>Installation rapide</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100 shadow-sm">
                <Card.Body>
                  <ShieldCheck size={48} className="text-primary mb-3" />
                  <Card.Title>Sécurité des données</Card.Title>
                  <Card.Text>Conforme RGPD</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
