import React, { useState } from "react";
import { Link, useNavigate as navigate } from "react-router-dom";
const PulldownMenu = ({ navigate }) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <ul>
        <li>
          <Link to="/account">
            <img src="/images/buttons/edit-button.svg" />
            Account
          </Link>
        </li>
        <li onClick={logout()}>
          <img src="/images/buttons/logout-button.svg" />
          Logout
        </li>
        <li>
          <Link to="/profile">
            <img src="/images/buttons/account-button.svg" />
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default PulldownMenu;