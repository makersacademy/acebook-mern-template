import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Navbar, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';

// import {
//   faHouse,
//   faPlus,
// } from '@fortawesome/free-solid-svg-icons';
import SignUpForm from '../user/SignUpForm'; 



const NavBar = () => {
  // const [user, setUser] = useState({ name: 'John Doe', picture: 'https://placekitten.com/50/50' });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <Container>
      <Navbar bg="light" variant="light" sticky="top">
          <Navbar.Brand href="#">
          <h5>acebook.</h5>
        </Navbar.Brand>        

        <Nav className="me-auto">
          <Nav.Link href="#feed">
            <FontAwesomeIcon icon={faHouse} size="xl" />
          </Nav.Link>
          <Nav.Link href="#create_post">
            <FontAwesomeIcon icon={faPlus} size="2xl" />
          </Nav.Link>
                 
          <Nav.Link href="#profile">
            <span>{SignUpForm.user && SignUpForm.user.name}</span>
          </Nav.Link>
         
        </Nav>
      </Navbar>
    </Container>
  );
}
export default NavBar;

// {/* <p>Welcome, {user.name}</>
//             <p><img src={post.user.image} alt={user.name} /></p>
//               <span>{post.user && post.user.name}</span> */}
//                )}
//       ) : (
//             <Nav.Link onClick={handleLogin}>Login</Nav.Link>
//           )}  */}
// add
//  