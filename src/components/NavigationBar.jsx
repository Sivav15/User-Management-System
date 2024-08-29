import React from 'react';
import { Navbar, Nav, Button, Image, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutReducer } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';


function NavigationBar() {
    const { name, avatar } = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutReducer());
        navigate('/');
    };

    return (
        <Navbar
            bg="light"
            expand="lg"
            className="shadow-sm mb-3 navbar-custom"
        >
            <Container fluid>
                <Navbar.Brand href="/" className="fw-bold">
                    User Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">
                        {name && (
                            <Navbar.Text className="d-flex align-items-center me-3">
                                <span className="fw-semibold">{name}</span>
                            </Navbar.Text>
                        )}

                        {avatar && (
                            <Image
                                src={avatar}
                                roundedCircle
                                width="40"
                                height="40"
                                className="ms-2"
                                alt="User Avatar"
                            />
                        )}

                        <Button
                            onClick={logout}
                            variant="outline-danger"
                            size="sm"
                            className="ms-3 btn-custom"
                        >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
