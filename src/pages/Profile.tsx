import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { 
  PersonFill, 
  Envelope, 
  Telephone, 
  GeoAlt, 
  HeartFill,
  Pencil,
  Check,
  X 
} from 'react-bootstrap-icons';

const Profile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Mohamed Ali',
    email: 'mohamed.ali@example.com',
    phone: '+216 12 345 678',
    address: 'Tunis, Tunisia',
    priority: 'Aucun',
    avatar: null as string | null
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setError(null);
  };

  const handleSave = () => {
    // Ici vous feriez normalement une requête API pour sauvegarder
    if (!tempProfile.fullName || !tempProfile.email) {
      setError('Les champs Nom et Email sont obligatoires');
      return;
    }
    
    setProfile({ ...tempProfile });
    setEditMode(false);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setTempProfile({
            ...tempProfile,
            avatar: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-4 position-relative">
                <div className="position-relative d-inline-block">
                  {tempProfile.avatar ? (
                    <img 
                      src={tempProfile.avatar} 
                      alt="Profile" 
                      className="rounded-circle"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div 
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" 
                      style={{ width: '100px', height: '100px' }}
                    >
                      <PersonFill size={48} className="text-white" />
                    </div>
                  )}
                  {editMode && (
                    <div className="position-absolute bottom-0 end-0">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="btn btn-sm btn-light rounded-circle p-2">
                          <Pencil size={16} />
                        </Form.Label>
                        <Form.Control 
                          type="file" 
                          onChange={handleFileChange}
                          accept="image/*"
                          className="d-none"
                        />
                      </Form.Group>
                    </div>
                  )}
                </div>
                <h3 className="mt-3">
                  {editMode ? (
                    <Form.Control
                      type="text"
                      value={tempProfile.fullName}
                      onChange={(e) => setTempProfile({...tempProfile, fullName: e.target.value})}
                    />
                  ) : (
                    profile.fullName
                  )}
                </h3>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formEmail">
                    <Form.Label><Envelope className="me-2" />Email</Form.Label>
                    {editMode ? (
                      <Form.Control
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                      />
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={profile.email} />
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formPhone">
                    <Form.Label><Telephone className="me-2" />Téléphone</Form.Label>
                    {editMode ? (
                      <Form.Control
                        type="tel"
                        value={tempProfile.phone}
                        onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                      />
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={profile.phone} />
                    )}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label><GeoAlt className="me-2" />Adresse</Form.Label>
                  {editMode ? (
                    <Form.Control
                      type="text"
                      value={tempProfile.address}
                      onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                    />
                  ) : (
                    <Form.Control plaintext readOnly defaultValue={profile.address} />
                    )}
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPriority">
                  <Form.Label><HeartFill className="me-2 text-danger" />Privilège</Form.Label>
                  {editMode ? (
                    <Form.Select
                      value={tempProfile.priority}
                      onChange={(e) => setTempProfile({...tempProfile, priority: e.target.value})}
                    >
                      <option>Aucun</option>
                      <option>Femme enceinte</option>
                      <option>Personne âgée</option>
                      <option>Handicapé</option>
                    </Form.Select>
                  ) : (
                    <Form.Control plaintext readOnly defaultValue={profile.priority} />
                  )}
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  {editMode ? (
                    <>
                      <Button variant="outline-secondary" onClick={handleCancel}>
                        <X className="me-1" /> Annuler
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        <Check className="me-1" /> Sauvegarder
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={handleEdit}>
                      <Pencil className="me-1" /> Modifier Profil
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
