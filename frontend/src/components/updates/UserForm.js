import React, { useState } from "react";
import './UserForm.css';

const UserForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();

  console.log(window.localStorage.getItem("token"));

    fetch("/userUpdatesRoute", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
    }).then((response) => {
        console.log(response.status);
      if (response.status === 200) {
        setSuccessMessage("Your changes have been updated successfully.");
        navigate("/profile/");

        // Clear the input fields
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      
      } else {
        setSuccessMessage("Changes failed, please try again.");
        navigate("/signup");
      }
    });
  };

  const handleEmailUpdate = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordUpdate = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameUpdate = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameUpdate = (event) => {
    setLastName(event.target.value);
  };

  const handleDelete = () => {
    fetch("/userUpdatesRoute", {
      method: "delete",
    })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("Your account has been deleted successfully.");
          navigate("/posts");
        } else {
          setSuccessMessage("Account deletion failed, please try again.");
        }
      })
      .catch((error) => {
        setSuccessMessage("Account deletion failed, please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
    <div class="form-header">
      <p>Update your details here:</p>
    </div>

    <div class="form-group">
      <div class="aligned-credentials">
        <div class="email-box-space">
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailUpdate}
          />
        </div>
         <div class="password-box-space">
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordUpdate}
          /> 
        </div> 
      </div>
    </div>

    <div class="form-group">
      <div class="aligned-names">
        <div class="first-name-box-space">
          <input
            placeholder="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstNameUpdate}
          />
        </div>
        <div class="last-name-box-space">
          <input
            placeholder="Last Name"
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameUpdate}
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <input id="submit" type="submit" value="Submit" />
    </div>
    {successMessage && (
        <div
          className={`success-message ${responseStatus === 200 ? 'ok' : 'error'}`}
        >
          {successMessage}
        </div>
)}

<div class="form-group">
      <button type="button" onClick={handleDelete}>
        Delete Account
      </button>
    </div>

  </form>
  );
};

export default UserForm;

