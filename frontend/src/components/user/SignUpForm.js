import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Button from "../button/Button";

const SignUpForm = ({ navigate }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="mx-auto h-16 w-auto stroke-blue-600" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Acebook
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              placeholder="Name"
              id="name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
            <input
              placeholder="Username"
              id="username"
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
            <input
              placeholder="Email"
              id="email"
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
            <input
              placeholder="Password"
              id="password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
          </div>
          <Button text="Sign up" type="submit" id="submit" />
        </form>
        <div>
          <p className="text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              log into your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default SignUpForm;
