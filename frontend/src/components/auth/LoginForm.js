import React, { useState } from 'react';
import './LoginForm.css'

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    // 201 indicates the successful creation of a new resource on the server.
    if (response.status !== 201) {
      console.log("oop");
      navigate("/login");
    } else {
      console.log("yay");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userId", data.userId);
      navigate("/posts");
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handlesignupClick = () => {
    navigate("/signup");
  };


    return (
      <>
      <div className='form-container'>
        
      <h3 className='heading' >Log in to Acebook</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Submit"
          />
        </form>
        <p>Not registered yet? Sign up for Acebook</p>
        <button type="button" id="sign-up-button" onClick={handlesignupClick}>
          Sign up
        </button>
        </div>
      </>
    );
}

export default LogInForm;
