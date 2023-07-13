import React, { useState } from "react";
import "../../index.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (file) {
      formData.append("image", file);
    }

    console.log(formData);

    fetch("/users", {
      method: "post",
      body: formData,
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUserLogin = () => {};

  return (
    // <form onSubmit={handleSubmit}>
    //     <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
    //     <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
    //   <input id='submit' type="submit" value="Submit" />
    // </form>

    <div className="container">
      <div className="form-container">
        <form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {file ? <img src={URL.createObjectURL(file)} alt="Preview" /> : null}

          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="input"
          />
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
          />
          <input id="photo" type="file" onChange={handleFileChange} />
          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Submit"
            className="submit-button"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
