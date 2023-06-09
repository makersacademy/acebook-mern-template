import React from 'react';
import './Navbar.css';

const Navbar = ({ navigate }) => {

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }


    return(
      <>
        <div className="topnav">
          <button onClick={logout}>
            Logout
          </button>
        </div>
      </>
      )

}

export default Navbar;