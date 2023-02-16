import React, { useState } from "react";
import { Link } from "react-router-dom";
import PulldownMenu from "../pulldownMenu/PulldownMenu";
import styles from "./Navbar.module.css";

const Navbar = ({ navigate, token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={token ? "/posts" : "/"}>
          <img src="/images/Acebook.svg" alt="logo" />
          Acebook-Air
        </Link>
      </div>
      {token ? (
        <div className={styles.profile}>
          <img
            src="/images/buttons/account-button.svg"
            alt="logo"
            onClick={toggleMenu}
          />
          <div className={styles.menu}>
            <PulldownMenu
              navigate={navigate}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
              setToken={setToken}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
