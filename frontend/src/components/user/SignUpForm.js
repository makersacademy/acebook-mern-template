import React, { useState } from "react";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async event => {
    event.preventDefault();

    if (validateName() && validateEmail() && validatePassword()) {
      fetch("/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      }).then(response => {
        if (response.status === 201) {
          navigate("/login");
        } else {
          response.json().then(data => {
            setValidationError({ password: data.message });
          });
        }
      });
    }
  };

  const validateName = () => {
    if (name.length > 0) {
      setValidationError(prevState => ({ ...prevState, name: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, name: "Name must be at least one character long" }));
      return false;
    }
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = re.test(email);

    if (validEmail) {
      setValidationError(prevState => ({ ...prevState, email: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, email: "Email address is not valid" }));
      return false;
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError(prevState => ({ ...prevState, password: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, password: "Invalid password" }));
      return false;
    }
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name:</label>
          <input placeholder="Name" id="name" type="text" value={name} onChange={handleNameChange} />
          <p className="validation-error">{validationError?.name}</p>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input placeholder="Email" id="email" type="email" value={email} onChange={handleEmailChange} />
          <p className="validation-error">{validationError?.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} />
          <p className="validation-error">{validationError?.password}</p>
        </div>

        <input id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default SignUpForm;
