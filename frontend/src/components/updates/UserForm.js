import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

        // Clear the input fields
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      } else {
        setSuccessMessage("Changes failed, please try again.");
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
    setShowPopup(true);
  };

  const handlePopupOK = () => {
    // Handle OK button click
    window.localStorage.removeItem("token");

    fetch("/userUpdatesRoute", {
      method: "delete",
    })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("Your account has been deleted successfully.");
          navigate("/goodbye");
        } else {
          setSuccessMessage(
            "Account deletion failed, please contact our amazing team for support!"
          );
        }
      })
      .catch((error) => {
        setSuccessMessage("Account deletion failed, please try again.");
      });

    setShowPopup(false);
  };

  const handlePopupCancel = () => {
    // Handle Cancel button click
    setShowPopup(false);
  };

  useEffect(() => {
    const popupElement = document.getElementById("popup");
    if (popupElement) {
      popupElement.style.display = showPopup ? "block" : "none";
    }
  }, [showPopup]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-header">
        <p>Update your details here:</p>
      </div>

      <div className="form-group">
        <div className="aligned-credentials">
          <div className="email-box-space">
            <input
              placeholder="Email"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailUpdate}
            />
          </div>
          <div className="password-box-space">
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

      <div className="form-group">
        <div className="aligned-names">
          <div className="first-name-box-space">
            <input
              placeholder="First Name"
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameUpdate}
            />
          </div>
          <div className="last-name-box-space">
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

      <div className="form-group">
        <input id="submit" type="submit" value="Submit" />
      </div>

      <div className="form-group">
        <button type="button" onClick={handleDelete}>
          Delete Account
        </button>
      </div>

      {successMessage && (
        <div
          className={`success-message ${
            successMessage.includes("failed") ? "error" : "ok"
          }`}
        >
          {successMessage}
        </div>
      )}

      {showPopup && (
        <div id="popup" className="popup">
          <div className="popup-content">
            <h2>Confirmation</h2>
            <p>Are you sure you want to delete your account?</p>
            <div className="popup-buttons">
              <button id="popup-ok" onClick={handlePopupOK}>
                OK
              </button>
              <button id="popup-cancel" onClick={handlePopupCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default UserForm;
