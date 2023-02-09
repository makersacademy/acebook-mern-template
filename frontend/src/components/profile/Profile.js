import Feed from "../feed/Feed";
import React from "react";

function Profile({ navigate }) {
  return (
    <>
      <h2>Profile</h2>
      <Feed navigate={navigate} path={"/account"}></Feed>
    </>
  );
}

export default Profile;
