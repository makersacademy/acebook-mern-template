import React from 'react';

const Navbar = ({ navigate }) => {

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }


    return(
      <>
        <button onClick={logout}>
          Logout
        </button>
        </>
      )

}

export default Navbar;