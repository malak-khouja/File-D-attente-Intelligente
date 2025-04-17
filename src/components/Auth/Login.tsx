import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Envelope, Lock } from "react-bootstrap-icons";
import { authService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Requis"),
  password: Yup.string().required("Requis"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Connexion</h2>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  try {
                    await authService.login(values.email, values.password);
                    navigate("/");
                  } catch (error) {
                    setErrors({
                      email: " ",
                      password: "Email ou mot de passe incorrect",
                    });
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
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
                        {(msg) => (
                          <Alert variant="danger" className="mt-1">
                            {msg}
                          </Alert>
                        )}
                      </ErrorMessage>
                    </BootstrapForm.Group>

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
                        {(msg) => (
                          <Alert variant="danger" className="mt-1">
                            {msg}
                          </Alert>
                        )}
                      </ErrorMessage>
                    </BootstrapForm.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-100 mb-3"
                    >
                      {isSubmitting ? "Connexion..." : "Se connecter"}
                    </Button>

                    <div className="text-center">
                      <p className="mb-0">
                        Pas encore de compte?{" "}
                        <a href="/signup" className="text-decoration-none">
                          S'inscrire
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

export default Login;
