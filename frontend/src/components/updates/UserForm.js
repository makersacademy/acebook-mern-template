import React, { useState } from "react";
// import './SignUpForm.css';

const UserForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setfirstName] = useState("");
//   const [lastName, setlastName] = useState("");
const [successMessage, setSuccessMessage] = useState("");

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
        // password: password,
        // firstName: firstName,
        // lastName: lastName,
      }),
    }).then((response) => {
        console.log(response.status);
      if (response.status === 200) {
        setSuccessMessage("Email updated successfully.");
        navigate("/profile/");
      } else {
        setSuccessMessage("Email did not update, please try again.");
        navigate("/signup");
      }
    });
  };

  const handleEmailUpdate = (event) => {
    setEmail(event.target.value);
  };

//   const handlePasswordUpdate = (event) => {
//     setPassword(event.target.value);
//   };

//   const handlefirstNameUpdate = (event) => {
//     setfirstName(event.target.value);
//   };

//   const handlelastNameUpdate = (event) => {
//     setlastName(event.target.value);
//   };

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
        {/* <div class="password-box-space">
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordUpdate}
          /> */}
        {/* </div> */}
      </div>
    </div>

    {/* <div class="form-group">
      <div class="aligned-names">
        <div class="first-name-box-space">
          <input
            placeholder="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={handlefirstNameUpdate}
          />
        </div>
        <div class="last-name-box-space">
          <input
            placeholder="Last Name"
            id="lastName"
            type="text"
            value={lastName}
            onChange={handlelastNameUpdate}
          />
        </div>
      </div>
    </div> */}

    <div class="form-group">
      <input id="submit" type="submit" value="Submit" />
    </div>
    {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
  </form>
  );
};

export default UserForm;

