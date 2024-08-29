import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState('');

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post('/api/login', values);
                setMessage(res.data.msg);
                formik.resetForm();
            } catch (err) {
                setMessage('Error in login');
            }
        },
    });

    return (
        <Container >
            <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh', }}>
                <Col sm={12} md={8} xl={6} xxl={4}>
                    <Form noValidate onSubmit={formik.handleSubmit} className="p-4 shadow rounded bg-light">
                        <h2 className="text-center mb-4">Login</h2>

                        {message && <Alert variant="info" className="text-center">{message}</Alert>}

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.email && formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.password && formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-100 rounded-pill mt-4"
                        >
                            {formik.isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>

                        <div className="text-center mt-3">
                            Don't have an account? <Link to="/register">Sign up now</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
