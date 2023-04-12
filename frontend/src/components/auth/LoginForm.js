import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./LoginForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      let data = await response.json();
      if (data.error === "Invalid email") {
        setError("Invalid email");
        setEmail("");
        setPassword("");
      } else if (data.error === "Invalid password") {
        setError("Invalid password");
        setEmail("");
        setPassword("");
      } else {
        setError("Invalid email and password: ");
        setEmail("");
        setPassword("");
      }
    } else {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/posts");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Container>
        <h1 className="d-flex justify-content-center mt-5">acebook.</h1>
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit} className="">
            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                // id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            {error && <div className="alert alert-danger">{error}<a href="/signup">Please sign up</a></div>}
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" id="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LogInForm;

