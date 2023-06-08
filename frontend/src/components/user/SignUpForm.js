import React, { useState } from "react";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateName() || !validateEmail() || !validatePassword()) {
      setName("");
      setEmail("");
      setPassword("");
      return;
    }

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
        navigate("/signup");
      }
    });
  };

  const validateName = () => {
    if (name.length > 0) {
      setValidationError({ name: "", email: "", password: "" });
      return true;
    } else {
      setValidationError({ name: "Name must be at least one character long" });
      return false;
    }
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = re.test(email);

    if (validEmail) {
      setValidationError({ name: "", email: "", password: "" });
      return true;
    } else {
      setValidationError({ email: "Email address is not valid" });
      return false;
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError({ name: "", email: "", password: "" });
      return true;
    } else {
      setValidationError({ password: "Invalid password" });
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
      <form onSubmit={handleSubmit}>
        <div> 
          <label htmlFor="name">Name:</label>
          <input placeholder="Name" id="name" type="text" value={name} onChange={handleNameChange} />
          <p>{validationError?.name}</p>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input placeholder="Email" id="email" type="text" value={email} onChange={handleEmailChange} />
          <p>{validationError?.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} />
          <p>{validationError?.password}</p>
        </div>      

        <input id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default SignUpForm;
