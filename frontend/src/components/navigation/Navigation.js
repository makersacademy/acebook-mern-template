import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // Import NavLink
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavigationBar.css'

const handleClick = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("userId")
}

const NavigationBar = () => {
    const userId = window.localStorage.getItem("userId");
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand id='navbar-brand'>Windy Acebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <CustomNavLink className="nav-link" to="/posts">Posts</CustomNavLink>
                        <CustomNavLink className="nav-link" to={"/users/" + userId}>Your Account Info</CustomNavLink>
                        <Link to='/login' onClick={handleClick} className="nav-link">
                            Logout
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const CustomNavLink = ({ to, children }) => {
    return (
        <NavLink to={to} id='activeLink' activeclassname="active" className="nav-link">
            {children}
        </NavLink>
    );
};

export default NavigationBar;



