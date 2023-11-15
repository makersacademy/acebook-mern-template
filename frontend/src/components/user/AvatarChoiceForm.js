import React, { useState } from "react";

// location props is passed in App.js and it is useLocation to retrieve user email passed in signup page
const AvatarChoiceForm = ({ navigate, location }) => {
  // retrieve userData passed from previous page
  const userData = location.state?.userEmail || null;

  // empty state when form initialized
  const [selectedAvatar, setSelectedAvatar] = useState("");

  // function stores updated avatar filename
  const handleAvatarChange = (event) => {
    setSelectedAvatar(event.target.value); // update state with selected value
  };

  // function handling submit of the form
  const handleSubmit = async (event) => {
    // no default choice in browser, user must make a choice themselves

    event.preventDefault();

    // HTTP request to specific path. Information from the form is sent there.
    fetch("/users/avatar", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: selectedAvatar, user_email: userData }),
    }).then((response) => {
      if (response.status === 201) {
        // redirect to login when signup successfull
        navigate("/login");
      } else {
        navigate("/choose-avatar");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="avatar">Choose avatar:</label>

      {/* each avatar has it's own value which is filename */}
      {/* type="radio" is type of a checkbox where user can choose only one */}
      <div class="avatar-checkbox">
        <input
          type="radio"
          name="avatar"
          placeholder="avatar"
          id="avatar1"
          value="1.svg"
          onChange={handleAvatarChange}
        />
        <label for="avatar1" class="checkbox-avatar-image">
          <img width="100px" src="../images/avatars/1.svg" alt=""></img>
        </label>
      </div>

      <div class="avatar-checkbox">
        <input
          type="radio"
          name="avatar"
          placeholder="avatar"
          id="avatar2"
          value="2.svg"
          onChange={handleAvatarChange}
        />
        <label for="avatar2" class="checkbox-avatar-image">
          <img width="100px" src="../images/avatars/2.svg" alt=""></img>
        </label>
      </div>

      <div class="avatar-checkbox">
        <input
          type="radio"
          name="avatar"
          placeholder="avatar"
          id="avatar3"
          value="3.svg"
          onChange={handleAvatarChange}
        />
        <label for="avatar3" class="checkbox-avatar-image">
          <img width="100px" src="../images/avatars/3.svg" alt=""></img>
        </label>
      </div>

      <div class="avatar-checkbox">
        <input
          type="radio"
          name="avatar"
          placeholder="avatar"
          id="avatar4"
          value="4.svg"
          onChange={handleAvatarChange}
        />
        <label for="avatar4" class="checkbox-avatar-image">
          <img width="100px" src="../images/avatars/4.svg" alt=""></img>
        </label>
      </div>

      <div class="avatar-checkbox">
        <input
          type="radio"
          name="avatar"
          placeholder="avatar"
          id="avatar5"
          value="5.svg"
          onChange={handleAvatarChange}
        />
        <label for="avatar5" class="checkbox-avatar-image">
          <img width="100px" src="../images/avatars/5.svg" alt=""></img>
        </label>
      </div>

      <div class="avatar-checkbox">
        <input
          type="radio"
          name="avatar"
          placeholder="avatar"
          id="avatar0"
          value="0.svg"
          onChange={handleAvatarChange}
        />
        <label for="avatar0" class="checkbox-avatar-image">
          <img width="100px" src="../images/avatars/0.svg" alt=""></img>No avatar
        </label>
      </div>

      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default AvatarChoiceForm;
