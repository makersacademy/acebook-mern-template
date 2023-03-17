import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Button from "../button/Button";
import useLogin from "../../hooks/useLogin";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login(email, password);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Logo className="mx-auto h-16 w-auto stroke-blue-600" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome to Acebook
            </h2>
            <p
              className="mt-2 text-center text-xl font-light text-gray-500
          "
            >
              Log into your account
            </p>
          </div>
          <form
            className="mt-8 space-y-6 rounded-xl border border-gray-100 bg-white p-8"
            onSubmit={handleSubmit}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <input
                id="email"
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="relative block w-full rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
              <input
                id="password"
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="relative block w-full rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </div>
            <Button
              isDisabled={isLoading}
              text="Sign in"
              type="submit"
              id="submit"
            />
          </form>
          <p className="text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
