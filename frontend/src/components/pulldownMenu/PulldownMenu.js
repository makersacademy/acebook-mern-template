import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './PulldownMenu.module.css';

const PulldownMenu = ({
  toggleMenu,
  isMenuOpen,
  setToken,
  setProfileImage,
}) => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('token');
    toggleMenu();
    setToken(null);
    setProfileImage(null);
    navigate('/');
  };
  return (
    <>
      <div className={isMenuOpen ? styles.menuOpen : styles.menu}>
        <ul>
          <li onClick={toggleMenu}>
            <Link to='/account'>
              <img src='/images/buttons/edit-button.svg' />
              <span>Account</span>
            </Link>
          </li>
          <li onClick={logout}>
            <a>
              {' '}
              <img src='/images/buttons/logout-button.svg' />
              <span>Logout</span>
            </a>
          </li>
          <li onClick={toggleMenu}>
            <Link to='/profile'>
              <img src='/images/buttons/account-button.svg' />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default PulldownMenu;
