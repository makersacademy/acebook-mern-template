import React, { useState } from "react";
import "./SignUpForm.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUpForm.css";


const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, name: name }),
    }).then((response) => {

      if (response.status === 201) {
        navigate("/login");
      } else {
       setError("This email already exists: ")
        setEmail("");
        setName("");
        setPassword("");
        navigate("/signup");
        
      }
    });

  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Container>
      <h1 className="d-flex justify-content-center mt-5">acebook.</h1>
      <div className="d-flex justify-content-center sign-up-form">
        <Form onSubmit={handleSubmit} className="">
          <Form.Group className="mb-3" >
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          {error && <div className="alert alert-danger">{error}<a href="/login">Please login</a> </div>}
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" id="submi">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpForm;
