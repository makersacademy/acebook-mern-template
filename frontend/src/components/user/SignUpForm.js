import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Button from "../button/Button";
import { ModalContext } from "../../contexts/ModalContext";
import useSignup from "../../hooks/useSignup";

// returns a boolean if the passwrod is valid
export const checkPassword = (passwordInput) => {
  return passwordInput.length >= 6 && /[A-Z]/.test(passwordInput);
};

export const passwordConfirmation = (password, passwordTwo) => {
  return password === passwordTwo;
};

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const { pushModal } = useContext(ModalContext);
  const { signup, isLoading } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation

    //  check password strength: at 6 chars, at least 1 cap
    if (!checkPassword(password)) {
      pushModal({
        message:
          "Password must have at least 6 characters and 1 capital letter.",
        type: "error",
      });
      return;
    }

    // check confirmedPassword == password
    if (!passwordConfirmation(password, passwordTwo)) {
      pushModal({
        message: "Both passwords do not match",
        type: "error",
      });
      return;
    }

    // if okay:

    await signup(name, username, email, password);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordTwoChange = (event) => {
    setPasswordTwo(event.target.value);
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
            <input
              placeholder="Retype Password"
              id="password2"
              type="password"
              required
              value={passwordTwo}
              onChange={handlePasswordTwoChange}
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            />
          </div>
          <Button
            isDisabled={isLoading}
            text="Sign up"
            type="submit"
            id="submit"
          />
        </form>
        <div>
          <p className="text-center text-sm text-gray-600">
            Or
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

export default SignUpForm;
