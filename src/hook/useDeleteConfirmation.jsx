import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const useDeleteConfirmation = () => {
    const [show, setShow] = useState(false);
    const [resolvePromise, setResolvePromise] = useState(null);

    const showDialog = () => {
        setShow(true);
        return new Promise((resolve) => {
            setResolvePromise(() => resolve);
        });
    };

    const handleConfirm = () => {
        if (resolvePromise) resolvePromise(true);
        setShow(false);
    };

    const handleCancel = () => {
        if (resolvePromise) resolvePromise(false);
        setShow(false);
    };

    const ConfirmationDialog = () => (
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return { ConfirmationDialog, showDialog };
};

export default useDeleteConfirmation;
