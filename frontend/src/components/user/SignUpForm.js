import React, { useState } from "react";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import CloudinaryUploadWidget from "./SignUpCloudinaryWidget";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState();
  const [deleteToken, setDeleteToken] = useState("");
  const [validationError, setValidationError] = useState({ name: "", email: "", password: "" });

  console.log(avatar);
  const handleSubmit = async event => {
    event.preventDefault();

    if (validateName() && validateEmail() && validatePassword()) {
      fetch("/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password, avatar: avatar }),
      }).then(response => {
        if (response.status === 201) {
          navigate("/login");
        } else {
          response.json().then(data => {
            setValidationError({ password: data.message });
          });
        }
      });
    }
  };

  const validateName = () => {
    if (name.length > 0) {
      setValidationError(prevState => ({ ...prevState, name: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, name: "Name must be at least one character long" }));
      return false;
    }
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = re.test(email);

    if (validEmail) {
      setValidationError(prevState => ({ ...prevState, email: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, email: "Email address is not valid" }));
      return false;
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError(prevState => ({ ...prevState, password: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, password: "Invalid password" }));
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

  const deleteImage = () => {
    fetch("https://api.cloudinary.com/v1_1/acebook/delete_by_token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: deleteToken }),
    }).then(response => {
      console.log(response);
      setAvatar("");
      setDeleteToken("");
    });
  };

  return (
    <>
      <div className="main">
        <div className="sub-main">
          <div>
            <h1>Sign Up</h1>
            <div>
              <p>
                {" "}
                Already registered? <Link to="/login">Log In</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name"></label>
                <input className="auth-input" placeholder="Name" id="name" type="text" value={name} onChange={handleNameChange} />
                <p className="validation-error">{validationError?.name}</p>
              </div>
              <div>
                <label htmlFor="email"></label>
                <input className="auth-input" placeholder="Email" id="email" type="email" value={email} onChange={handleEmailChange} />
                <p className="validation-error">{validationError?.email}</p>
              </div>
              <p className="text">If you'd like, you can upload an avatar</p>
              <CloudinaryUploadWidget setAvatar={setAvatar} setDeleteToken={setDeleteToken} />
              {avatar && (
                <div className="avatar-preview">
                  <button className="close" type="button" onClick={deleteImage}>
                    X
                  </button>
                  <p>Preview:</p>
                  <img src={avatar} alt="avatar preview" height="80" width="80" className="avatar" />
                </div>
              )}
              <div>
                <label htmlFor="password"></label>
                <input className="auth-input" placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} />
                <p className="validation-error">{validationError?.password}</p>
                <input id="submit" type="submit" value="Sign Up" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
