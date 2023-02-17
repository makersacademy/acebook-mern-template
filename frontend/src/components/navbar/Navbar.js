import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PulldownMenu from '../pulldownMenu/PulldownMenu';
import styles from './Navbar.module.css';
const Navbar = ({ navigate, token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          console.log(data.user.image);
          setProfileImage(data.user.image);
        });
    } else {
    }
  }, [token]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={token ? '/posts' : '/'}>
          <img src='/images/Acebook.svg' alt='logo' />
          Acebook-Air
        </Link>
      </div>
      {token ? (
        <div className={styles.profile}>
          {token && profileImage ? (
            <img src={profileImage} alt='logo' onClick={toggleMenu} />
          ) : (
            <img
              src='/images/buttons/account-button.svg'
              alt='logo'
              onClick={toggleMenu}
            />
          )}

          <div className={styles.menu}>
            <PulldownMenu
              navigate={navigate}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
              setToken={setToken}
              setProfileImage={setProfileImage}
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
