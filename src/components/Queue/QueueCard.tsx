import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface QueueCardProps {
  queueName: string;
  peopleInQueue: number;
  estimatedTime: number; // ✅ Add this prop
  onTakeTicket: () => void;
  onCancelTicket: () => void;
}

const QueueCard: React.FC<QueueCardProps> = ({
  queueName,
  peopleInQueue,
  estimatedTime, // ✅ Receive the prop
  onTakeTicket,
  onCancelTicket
}) => {
  return (
    <Card className="mt-4 shadow">
      <Card.Body>
        <Card.Title>{queueName}</Card.Title>
        <Card.Text>
          Personnes en attente: <strong>{peopleInQueue}</strong><br />
          Temps estimé: <strong>{estimatedTime} min</strong> {/* ✅ Display it */}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="success" onClick={onTakeTicket}>
            Prendre un Ticket
          </Button>
          <Button variant="danger" onClick={onCancelTicket}>
            Annuler
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QueueCard;

/*
import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface QueueCardProps {
  queueName: string;
  peopleInQueue: number;
  onTakeTicket: () => void;
  onCancelTicket: () => void;
}

const QueueCard: React.FC<QueueCardProps> = ({
  queueName,
  peopleInQueue,
  onTakeTicket,
  onCancelTicket
}) => {
  return (
    <Card className="mt-4 shadow">
      <Card.Body>
        <Card.Title>{queueName}</Card.Title>
        <Card.Text>
          Personnes en attente: <strong>{peopleInQueue}</strong>
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="success" onClick={onTakeTicket}>
            Prendre un Ticket
          </Button>
          <Button variant="danger" onClick={onCancelTicket}>
            Annuler
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QueueCard;*/