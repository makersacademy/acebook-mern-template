import React, { useEffect, useState } from 'react';

const Navbar = ({logoutHandle, token}) => {
  
    // Navbar uses classes from boostrap for basic styling

    return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Acebook</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    {/* Conditional operator to check if a token exists to decide which buttons to render */}
                    {token ? 
                    // If token exists, renders the logout button which calls logoutHandle on click
                    <>
                    <button onClick={logoutHandle}>
                        Logout
                    </button>
                    </> 
                    :
                    // If token doesn't exist, render the login and signup buttons
                    <>
                    <li className="nav-item">
                        <a className="nav-link" href="login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="signup">Signup</a>
                    </li>
                    </>
                    }
                </ul>
            </div>
        </div>
    </nav>
</>
    )
}

export default Navbar;