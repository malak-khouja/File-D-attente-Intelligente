import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Alert 
} from 'react-bootstrap';
import { 
  Clock, 
  PeopleFill, 
  Ticket 
} from 'react-bootstrap-icons';
import ServiceDropdown from '../components/Queue/ServiceDropdown';
import SectorDropdown from '../components/Queue/SectorDropdown';
import QueueCard from '../components/Queue/QueueCard';

interface QueueData {
  queueName: string;
  peopleInQueue: number;
  estimatedTime: number;
}

const Home: React.FC = () => {
  const [showQueue, setShowQueue] = useState<boolean>(false);
  const [queueData, setQueueData] = useState<QueueData>({
    queueName: '',
    peopleInQueue: 0,
    estimatedTime: 0
  });
  const [error, setError] = useState<string | null>(null);

  const handleServiceSelect = (service: string) => {
    try {
      // Simulation de données aléatoires avec vérification de type
      const randomPeople = Math.max(1, Math.floor(Math.random() * 15)); // Minimum 1 personne
      const randomTime = Math.max(5, Math.floor(Math.random() * 30)); // Minimum 5 minutes
  
      if (!service || typeof service !== 'string') {
        throw new Error('Service invalide');
      }
  
      setQueueData({
        queueName: `File ${service}`, // Ligne 41 corrigée
        peopleInQueue: randomPeople,  // Ligne 42 corrigée
        estimatedTime: randomTime     // Ligne 43 corrigée
      });
      setShowQueue(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  const handleTakeTicket = () => {
    if (queueData.queueName) {  // Vérification de sécurité
      alert(`Ticket pris pour ${queueData.queueName}`);
      setShowQueue(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="text-center mb-4">
            <PeopleFill className="me-2" />
            Gestion de File d'Attente Intelligente
          </h1>
          
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <SectorDropdown onSelect={() => setShowQueue(false)} />
                </Col>
                <Col md={6}>
                  <ServiceDropdown 
                    onSelect={handleServiceSelect} 
                    disabled={false}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {showQueue && queueData.queueName && (
            <QueueCard 
              queueName={queueData.queueName}
              peopleInQueue={queueData.peopleInQueue}
              estimatedTime={queueData.estimatedTime}
              onTakeTicket={handleTakeTicket}
              onCancelTicket={() => setShowQueue(false)}
            />
          )}

          <Row className="mt-5 g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Ticket size={48} className="text-primary mb-3" />
                  <Card.Title>Prenez un Ticket</Card.Title>
                  <Card.Text>
                    Évitez les files physiques en prenant votre ticket numérique
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Clock size={48} className="text-primary mb-3" />
                  <Card.Title>Temps Réel</Card.Title>
                  <Card.Text>
                    Suivez votre position en temps réel depuis votre mobile
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <PeopleFill size={48} className="text-primary mb-3" />
                  <Card.Title>Optimisation</Card.Title>
                  <Card.Text>
                    Notre système intelligent réduit votre temps d'attente
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;