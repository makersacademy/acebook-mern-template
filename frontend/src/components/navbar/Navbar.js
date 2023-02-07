import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </div>
  );
};
export default Navbar;
