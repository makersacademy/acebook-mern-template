import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHouse,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';



const NavBar = () => {
  const [user, setUser] = useState({ name: 'John Doe', picture: 'https://placekitten.com/50/50' });

  return (
    <>
      <br />
      <Navbar bg="light" variant="light">

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
          
          {user && (
            <Nav.Link href="#profile">
              <img src={user.picture} alt={user.name} />
              <span>{user.name}</span>
            </Nav.Link>
          )};
        </Nav>
      </Navbar>
    </>
  );
};


export default NavBar;
// add
//   < Navbar fixed = "top" />