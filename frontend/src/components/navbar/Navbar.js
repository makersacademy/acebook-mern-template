import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PulldownMenu from '../pulldownMenu/PulldownMenu';
import styles from './Navbar.module.css';
const apiUrl = require('../../apiUrl');
const Navbar = ({ navigate, token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (token) {
      fetch(`${apiUrl}/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          console.log(data.posts[0].user_id.image);
          setProfile(data);
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
          {token && profile ? (
            <img
              src={profile.posts[0].user_id.image}
              alt='logo'
              onClick={toggleMenu}
            />
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
              setProfile={setProfile}
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
