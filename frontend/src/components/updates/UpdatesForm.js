import React, { useState } from "react";

const UpdatesForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
 // const [password, setPassword] = useState("");
 // const [firstName, setFirstName] = useState("");
 // const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/usersUpdate", {
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
      if (response.status === 201) {
        navigate("/navigate");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailUpdate = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-header">
        <p>Are there any details you would like to change?</p>
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
        </div>
      </div>

<div class="form-group">
<input id="submit" type="submit" value="Submit" />
</div>
</form>
  );
};

export default UpdatesForm;
