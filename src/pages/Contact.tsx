import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt, Send } from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Ce champ est requis'),
  email: Yup.string().email('Email invalide').required('Ce champ est requis'),
  message: Yup.string().required('Ce champ est requis').min(20, 'Minimum 20 caractères')
});

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="text-center mb-5">Contactez-Nous</h1>
          
          <Row className="g-4 mb-5">
            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <Envelope size={24} className="text-primary me-3" />
                <div>
                  <h5>Email</h5>
                  <p className="mb-0">contact@smartqueue.tn</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <Telephone size={24} className="text-primary me-3" />
                <div>
                  <h5>Téléphone</h5>
                  <p className="mb-0">+216 70 123 456</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <GeoAlt size={24} className="text-primary me-3" />
                <div>
                  <h5>Adresse</h5>
                  <p className="mb-0">Tunis, Tunisia</p>
                </div>
              </div>
            </Col>
          </Row>

          {submitted ? (
            <Alert variant="success" className="text-center">
              Merci pour votre message! Nous vous contacterons bientôt.
            </Alert>
          ) : (
            <Card className="shadow-sm">
              <Card.Body>
                <Formik
                  initialValues={{ name: '', email: '', message: '' }}
                  validationSchema={ContactSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      console.log(values); // Ici vous enverriez les données à votre API
                      setSubmitted(true);
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom Complet</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.message}
                          isInvalid={touched.message && !!errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-grid">
                        <Button 
                          variant="primary" 
                          type="submit" 
                          disabled={isSubmitting}
                        >
                          <Send className="me-2" />
                          {isSubmitting ? 'Envoi en cours...' : 'Envoyer Message'}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;