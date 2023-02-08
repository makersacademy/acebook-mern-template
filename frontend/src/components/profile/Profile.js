import Feed from "../feed/Feed";
import React, { useNavigate } from "react";

function Profile({ navigate }) {
  return (
    <>
      <h2>Profile</h2>
      <Feed navigate={useNavigate} path={"/account"}></Feed>
    </>
  );
}

export default Profile;
