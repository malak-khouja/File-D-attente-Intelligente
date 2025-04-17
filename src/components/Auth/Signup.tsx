import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Card, Alert, Form as BootstrapForm } from 'react-bootstrap';
import { PersonFill, Envelope, Telephone, Lock } from 'react-bootstrap-icons';
import { authService } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Trop court!')
    .max(50, 'Trop long!')
    .required('Requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('Requis'),
  phone: Yup.string()
    .matches(/^(\+?\d+)?\s?(\(\d+\))?[\s-]?\d+[\s-]?\d+[\s-]?\d+$/, 'Numéro de téléphone invalide')
    .required('Requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .required('Requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre')
    .required('Veuillez confirmer votre mot de passe')
});

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">
                <PersonFill className="me-2" />
                Créer un compte
              </h2>
              
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  try {
                    await authService.register({
                      fullName: values.fullName,
                      email: values.email,
                      password: values.password,
                      phone: values.phone
                    });
                    navigate('/login');
                  } catch (error) {
                    setStatus({ error: "L'inscription a échoué. Veuillez réessayer." });
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, status }) => (
                  <Form>
                    {status?.error && (
                      <Alert variant="danger" className="mb-4">
                        {status.error}
                      </Alert>
                    )}

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>
                        <PersonFill className="me-2" />
                        Nom complet
                      </BootstrapForm.Label>
                      <Field 
                        name="fullName" 
                        type="text" 
                        as={BootstrapForm.Control} 
                        placeholder="Votre nom complet" 
                      />
                      <ErrorMessage name="fullName">
  {msg => <Alert variant="danger" className="mt-1">{msg}</Alert>}
</ErrorMessage>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>
                        <Envelope className="me-2" />
                        Email
                      </BootstrapForm.Label>
                      <Field 
                        name="email" 
                        type="email" 
                        as={BootstrapForm.Control} 
                        placeholder="exemple@email.com" 
                      />
                      <ErrorMessage name="email">
  {msg => <Alert variant="danger" className="mt-1">{msg}</Alert>}
</ErrorMessage>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>
                        <Telephone className="me-2" />
                        Téléphone
                      </BootstrapForm.Label>
                      <Field 
                        name="phone" 
                        type="tel" 
                        as={BootstrapForm.Control} 
                        placeholder="+216 12 345 678" 
                      />
                      <ErrorMessage name="phone">
  {msg => <Alert variant="danger" className="mt-1">{msg}</Alert>}
</ErrorMessage>
                    </BootstrapForm.Group>

                    <Row>
                      <Col md={6}>
                        <BootstrapForm.Group className="mb-3">
                          <BootstrapForm.Label>
                            <Lock className="me-2" />
                            Mot de passe
                          </BootstrapForm.Label>
                          <Field 
                            name="password" 
                            type="password" 
                            as={BootstrapForm.Control} 
                            placeholder="••••••••" 
                          />
                          <ErrorMessage name="password">
  {msg => <Alert variant="danger" className="mt-1">{msg}</Alert>}
</ErrorMessage>
                        </BootstrapForm.Group>
                      </Col>
                      <Col md={6}>
                        <BootstrapForm.Group className="mb-3">
                          <BootstrapForm.Label>
                            <Lock className="me-2" />
                            Confirmation
                          </BootstrapForm.Label>
                          <Field 
                            name="confirmPassword" 
                            type="password" 
                            as={BootstrapForm.Control} 
                            placeholder="••••••••" 
                          />
                          <ErrorMessage name="confirmPassword">
                          {msg => <Alert variant="danger" className="mt-1">{msg}</Alert>}
                        </ErrorMessage>
                        </BootstrapForm.Group>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isSubmitting}
                        size="lg"
                      >
                        {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
                      </Button>
                    </div>

                    <div className="text-center mt-3">
                      <p>
                        Déjà un compte?{' '}
                        <a href="/login" className="text-decoration-none">
                          Connectez-vous
                        </a>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
