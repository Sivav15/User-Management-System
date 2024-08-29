import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UserProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth.auth);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    };

    if (!token) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-danger fw-bold p-4 border border-danger rounded shadow-sm">
                <p className="text-center mb-4">Access Denied: Please log in to continue.</p>
                <button className="btn btn-primary" onClick={handleLogin}>
                    Log In
                </button>
            </div>
        );
    }

    return children;
};

export default UserProtectedRoute;
