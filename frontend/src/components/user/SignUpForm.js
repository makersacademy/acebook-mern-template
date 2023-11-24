import React, { useState } from "react";
import './SignUpForm.css'

const SignUpForm = ({ navigate }) => {
  // POST request with username, email and password, (empty avatar is added by default)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  let errorMessages = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorMessages = "";

    // generate error messages. If none: continue with handling submit
    let response = await fetch("/users/emails");
    const users = await response.json();
    console.log("users in SignUpForm = " + users);
    console.log("users[0]= " + users[0]);
  

    if (password.length < 8) {
      errorMessages += "Password must be at least 8 characters long\n";
    } if ((!/\d/.test(password)) || (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password))) {
      errorMessages += "Password must contain at least one number and special sign\n";
    } if (password !== password_confirmation) {
      errorMessages += "The entered passwords do not match.";
    } if (users.some(user => user.email === email)) { //Check if users contains some entry with 'email': email
      errorMessages += "Email must be unique!";
    } if (username === "") {
      errorMessages += "Please enter a username";
    } if (errorMessages !== "") {

      alert(errorMessages);
    } else {
      fetch("/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }).then((response) => {
        if (response.status === 201) {
          // redirect to avatar choice page while passing history from this page (user email)
          navigate("/choose-avatar", { state: { userEmail: email } });
        } else {
          navigate("/signup");
        }
      });
    }
  };

  // input change handlers
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // double password input
  const handleComparePasswords = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  // render of html object
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        
          <input
            placeholder="Username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          
          <input
            placeholder="Confirm your password"
            id="password_confirmation"
            type="password"
            value={password_confirmation}
            onChange={handleComparePasswords}
          />
        </div>
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
