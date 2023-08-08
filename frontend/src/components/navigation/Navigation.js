import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavigationBar.css'

const NavigationBar = () => {
    return (
        <Navbar bg='light' expand="lg">
            <Container>
                <Navbar.Brand>Windy Acebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <CustomNavLink to="/posts">Posts</CustomNavLink>
                        <CustomNavLink to="/login">Login</CustomNavLink>
                        <CustomNavLink to="/signup">Sign Up</CustomNavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const CustomNavLink = ({ to, children }) => {
    return (
        <NavLink to={to} activeClassName="active" className="nav-link">
            {children}
        </NavLink>
    );
};

export default NavigationBar;



// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// const NavigationBar = () => {
//     return (
//         <Navbar bg='light' expand="lg">
//             <Container>
//                 <Navbar.Brand href="#home">Windy Acebook</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         <Nav.Link href='/posts'>Home</Nav.Link>
//                         <Nav.Link href='/login'>Login</Nav.Link>
//                         <Nav.Link href='/signup'>Sign Up</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default NavigationBar;