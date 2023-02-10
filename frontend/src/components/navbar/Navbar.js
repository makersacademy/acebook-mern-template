import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/posts">
          <img src="/images/ace-casino-svgrepo-com.svg" alt="logo" />
          Acebook-Air
        </Link>
      </div>
      <ul className={styles.links}>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <div className={styles.profile}>
        <Link to="/profile">
          <img src="/images/profile-circle-svgrepo-com.svg" alt="logo" />
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
