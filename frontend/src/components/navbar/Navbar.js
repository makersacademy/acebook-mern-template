import React from "react";
import { Link } from "react-router-dom";
import PulldownMenu from "../pulldownMenu/PulldownMenu";
import styles from "./Navbar.module.css";
const Navbar = ({ navigate }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/Acebook.svg" alt="logo" />
          Acebook-Air
        </Link>
      </div>
      <div className={styles.profile}>
        <Link to="/profile">
          <img src="/images/buttons/account-button.svg" alt="logo" />
        </Link>
        <PulldownMenu />
      </div>
    </div>
  );
};

export default Navbar;
