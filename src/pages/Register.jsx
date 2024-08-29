import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { register_api } from '../service/api';
import { LoadingModal, useLoadingModal } from '../hook/useLoadingModal';

const Register = () => {
    const { showLoading, hideLoading, loading } = useLoadingModal();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        profession: Yup.string().required('Profession is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            profession: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                showLoading();

                const { data } = await axios.post(register_api, values);

                message.success(data.message);
                navigate('/');
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;

                    if (status >= 500) {
                        message.error(data.message);
                        return;
                    }
                    message.warning(data.message);
                } else {
                    console.log(error);
                    message.error('An unexpected error occurred');
                }
            } finally {
                hideLoading();
            }
        },
    });

    return (
        <Container>
            <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Col sm={12} md={8} xl={6} xxl={4}>
                    <Form noValidate onSubmit={formik.handleSubmit} className="p-4 shadow rounded bg-light">
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.name && formik.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

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

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"  // Corrected name attribute
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.phoneNumber && formik.errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formProfession">
                            <Form.Label>Profession</Form.Label>
                            <Form.Control
                                type="text"
                                name="profession"
                                value={formik.values.profession}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.touched.profession) && Boolean(formik.errors.profession)}
                                className="rounded-pill"
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.profession && formik.errors.profession}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-100 rounded-pill mt-4"
                        >
                            {formik.isSubmitting ? 'Registering...' : 'Register'}
                        </Button>

                        <div className="text-center mt-3">
                            Already have an account? <Link to="/">Sign in now</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
            <LoadingModal loading={loading} />
        </Container>
    );
};

export default Register;
