import React, { useState } from "react";

const LogInForm = ({ navigate, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status !== 201) {
      setErrorMessage('Invalid user!');
      navigate("/login");
    } else {
      onSuccess();
      let data = await response.json();
      window.localStorage.setItem("userid", data.userid)
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

  const signup = () => {
    navigate('/signup')
  }


    return (
      <div class='login'>
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <br></br>
        <br></br>
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <br></br>
        <br></br>
        <input role='submit-button' id='submit' type="submit" value="Sign in!" />
        {errorMessage && (
          <p className="error"> {errorMessage} </p>
          )}
        <br></br>
        <br></br>
      </form>
      <br></br>
      <button onClick={signup}>
        Not registered? Sign up here!
      </button>
      </div>
    );
}


export default LogInForm;
