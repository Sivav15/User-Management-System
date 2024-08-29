import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserEdit from './UserEdit';
import { LoadingModal, useLoadingModal } from '../hook/useLoadingModal';
import { message } from 'antd';
import axios from 'axios';
import { deleteUser_api, viewUsers_api } from '../service/api';
import { useSelector } from 'react-redux';
import useDeleteConfirmation from '../hook/useDeleteConfirmation';

const UsersTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const { showLoading, hideLoading, loading } = useLoadingModal();
    const { token, id } = useSelector((state) => state.auth.auth);
    const { ConfirmationDialog, showDialog } = useDeleteConfirmation();

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };



    const viewUsers = async () => {
        try {
            showLoading();

            const { data } = await axios.get(viewUsers_api, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'user_id': id
                }
            });


            setUsers(data.users || []);
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status >= 500) {
                    message.error(data.message);
                    return
                }
                message.warning(data.message)

            } else {
                console.log(error);

                message.error('An unexpected error occurred');
            }
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        if (token) {
            viewUsers();
        }
    }, [token]);

    const deleteUserRequest = async (_id) => {
        try {
            const confirmToDelete = await showDialog();

            if (!confirmToDelete) {
                return;
            }

            showLoading();
            const { data } = await axios.delete(`${deleteUser_api}/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'user_id': id
                },
            });

            const newUser = users.filter((item) => item._id !== _id);

            setUsers(newUser)

            message.success(data.message);
        } catch (error) {
            console.log(error);
            if (error.response) {
                const { status, data } = error.response;

                if (status >= 500) {
                    message.error(data.message);
                    return
                }
                message.warning(data.message)

            } else {
                console.log(error);

                message.error('An unexpected error occurred');
            }
        } finally {
            hideLoading();
        }

    };

    return (
        <Container className="mt-5">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Profession</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.profession}</td>
                                <td>
                                    <FaEdit
                                        className="text-primary me-2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleEdit(user)}
                                    />
                                    <FaTrash
                                        className="text-danger"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => deleteUserRequest(user._id)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <UserEdit
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setUsers={setUsers}
            />
            <LoadingModal loading={loading} />
            <ConfirmationDialog />
        </Container>
    );
};

export default UsersTable;
