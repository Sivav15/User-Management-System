import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser_api } from '../service/api';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { LoadingModal, useLoadingModal } from '../hook/useLoadingModal';

const UserEdit = ({ showModal, handleCloseModal, selectedUser, setUsers }) => {


    const { token } = useSelector((state) => state.auth.auth);
    const { showLoading, hideLoading, loading } = useLoadingModal();

    // updateUser_api
    const formik = useFormik({
        initialValues: {
            name: selectedUser ? selectedUser.name : '',
            phoneNumber: selectedUser ? selectedUser.phoneNumber : '',
            profession: selectedUser ? selectedUser.profession : '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            phoneNumber: Yup.string().required('Phone Number is required'),
            profession: Yup.string().required('Profession is required'),
        }),
        onSubmit: async (values) => {
            try {
                showLoading();

                const { data } = await axios.put(`${updateUser_api}/${selectedUser._id}`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(data);

                setUsers((users) => {
                    const newUser = users.map((user) => {
                        if (user._id === data.user._id) {
                            return data.user
                        }

                        return user
                    })

                    return newUser
                }
                )

                message.success(data.message);

                handleCloseModal()

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

    // Set Formik values when selectedUser changes
    React.useEffect(() => {
        if (selectedUser) {
            formik.setValues({
                name: selectedUser.name,
                phoneNumber: selectedUser.phoneNumber,
                profession: selectedUser.profession,
            });
        }
    }, [selectedUser]);

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            {...formik.getFieldProps('name')}
                            isInvalid={formik.touched.name && formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            {...formik.getFieldProps('phoneNumber')}
                            isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.phoneNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProfession">
                        <Form.Label>Profession</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter profession"
                            {...formik.getFieldProps('profession')}
                            isInvalid={formik.touched.profession && formik.errors.profession}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.profession}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div style={{ display: 'flex', gap: 4 }}>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <LoadingModal loading={loading} />
        </Modal>
    );
};

export default UserEdit;
